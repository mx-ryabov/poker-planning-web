using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using PokerPlanning.Infrastructure.src.Persistence;
using System.Runtime.CompilerServices;
using System.Text.Json;
using Testcontainers.PostgreSql;

namespace PokerPlanning.Api.IntegrationTests;

public class PokerPlanningWebApplicationFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private const string DebugLogPath = "debug-b687c2.log";
    private const string DebugSessionId = "b687c2";
    private readonly PostgreSqlContainer _dbContainer;

    public PokerPlanningWebApplicationFactory()
    {
        _dbContainer = new PostgreSqlBuilder("postgres:16")
            .WithDatabase("poker_planning_tests")
            .WithUsername("postgres")
            .WithPassword("postgres")
            .WithCleanUp(true)
            .Build();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                s => s.ServiceType == typeof(DbContextOptions<PokerPlanningDbContext>));
            if (descriptor is not null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<PokerPlanningDbContext>(options =>
            {
                var connectionString = BuildConnectionStringForCurrentEnvironment();
                options.UseNpgsql(connectionString);
            });

            var serviceProvider = services.BuildServiceProvider();

            using var scope = serviceProvider.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var context = scopedServices.GetRequiredService<PokerPlanningDbContext>();
            context.Database.EnsureCreated();
        });
    }

    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
    }

    public new async Task DisposeAsync()
    {
        await _dbContainer.StopAsync();
    }

    private static bool IsTruthy(string? value)
    {
        return string.Equals(value, "1", StringComparison.OrdinalIgnoreCase)
            || string.Equals(value, "true", StringComparison.OrdinalIgnoreCase)
            || string.Equals(value, "yes", StringComparison.OrdinalIgnoreCase);
    }

    private string BuildConnectionStringForCurrentEnvironment()
    {
        var raw = _dbContainer.GetConnectionString();
        var isAct = IsTruthy(Environment.GetEnvironmentVariable("ACT"));
        if (!isAct)
        {
            #region agent log
            WriteDebugLog(
                hypothesisId: "H_HOST",
                message: "Using raw Testcontainers connection string",
                data: new
                {
                    IsAct = isAct,
                    Ci = Environment.GetEnvironmentVariable("CI"),
                    RyukDisabled = Environment.GetEnvironmentVariable("TESTCONTAINERS_RYUK_DISABLED"),
                    RawConnectionString = raw,
                });
            #endregion
            return raw;
        }

        var builder = new NpgsqlConnectionStringBuilder(raw)
        {
            Host = "host.docker.internal",
            Port = _dbContainer.GetMappedPublicPort(5432),
        };

        #region agent log
        WriteDebugLog(
            hypothesisId: "H_HOST",
            message: "Using ACT host override connection string",
            data: new
            {
                IsAct = isAct,
                Ci = Environment.GetEnvironmentVariable("CI"),
                RyukDisabled = Environment.GetEnvironmentVariable("TESTCONTAINERS_RYUK_DISABLED"),
                RawConnectionString = raw,
                SelectedConnectionString = builder.ConnectionString,
            });
        #endregion
        return builder.ConnectionString;
    }

    private static void WriteDebugLog(
        string hypothesisId,
        string message,
        object? data = null,
        string runId = "post-fix",
        [CallerFilePath] string sourceFilePath = "",
        [CallerLineNumber] int sourceLineNumber = 0)
    {
        try
        {
            var location = $"{Path.GetFileName(sourceFilePath)}:{sourceLineNumber}";
            var payload = new
            {
                sessionId = DebugSessionId,
                runId,
                hypothesisId,
                location,
                message,
                data,
                timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
            };
            File.AppendAllText(ResolveLogPath(), JsonSerializer.Serialize(payload) + Environment.NewLine);
        }
        catch
        {
            // Keep diagnostics side-effect free.
        }
    }

    private static string ResolveLogPath()
    {
        var current = Directory.GetCurrentDirectory();
        for (var i = 0; i < 8; i++)
        {
            if (Directory.Exists(Path.Combine(current, ".git")))
            {
                return Path.Combine(current, DebugLogPath);
            }

            var parent = Directory.GetParent(current);
            if (parent is null)
            {
                break;
            }

            current = parent.FullName;
        }

        return Path.Combine(Directory.GetCurrentDirectory(), DebugLogPath);
    }
}

