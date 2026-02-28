using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using PokerPlanning.Infrastructure.src.Persistence;
using Testcontainers.PostgreSql;

namespace PokerPlanning.Api.IntegrationTests;

public class PokerPlanningWebApplicationFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
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
        if (!IsTruthy(Environment.GetEnvironmentVariable("TESTCONTAINERS_RYUK_DISABLED")))
        {
            return raw;
        }

        var builder = new NpgsqlConnectionStringBuilder(raw)
        {
            Host = "host.docker.internal",
            Port = _dbContainer.GetMappedPublicPort(5432),
        };

        return builder.ConnectionString;
    }
}

