using FluentAssertions;
using PokerPlanning.Application.src.GameFeature.Results;
using PokerPlanning.Application.src.Results;
using PokerPlanning.Contracts.src.Game;
using PokerPlanning.Domain.src.Common.DTO;
using PokerPlanning.Domain.src.Models.TicketAggregate.Enums;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace PokerPlanning.Api.IntegrationTests.Utilities;

public class GameHelper
{
    private const string DebugLogPath = "debug-b687c2.log";
    private const string DebugSessionId = "b687c2";
    private Random random = new Random();
    private HttpClient _client;
    public GameHelper(HttpClient httpClient)
    {
        _client = httpClient;
    }

    public UpdateTicketRequest CreateUpdateRequest()
    {
        var updatedData = new UpdateTicketDTO(
            Title: "Update Title",
            Description: "Updated Description",
            Link: "Updated Link",
            Type: TicketType.Bug,
            Identifier: "TI-90909",
            Estimation: "1"
        );
        return new(updatedData) { };
    }

    public async Task<TicketResult?> AddTicketToGame(Guid gameId)
    {
        AddTicketRequest request = new(GetTicketName(), TicketType.Task) { };
        var response = await _client.PostAsJsonAsync($"/api/games/{gameId}/ticket", request);
        return await response.Content.ReadFromJsonAsync<TicketResult>();
    }

    public async Task StartVoting(Guid gameId, Guid? ticketId)
    {
        var startVotingReq = new StartVotingRequest(ticketId);
        await _client.PutAsJsonAsync($"/api/games/{gameId}/start-voting", startVotingReq);
    }

    public async Task<GameParticipantResult?> GetCurrentParticipant(Guid gameId)
    {
        var currentParticipantResponse = await _client.GetAsync($"/api/games/{gameId}/current-participant");
        return await currentParticipantResponse.Content.ReadFromJsonAsync<GameParticipantResult>();
    }

    public async Task<JoinAsGuestGameResult?> JoinAsParticipant(Guid gameId)
    {
        var randomParticipantName = GetParticipantName();
        JoinAsGuestRequest joinAsGuestReq = new(randomParticipantName);
        var joinParticipantResponse = await _client.PostAsJsonAsync($"/api/games/{gameId}/join-as-guest", joinAsGuestReq);
        return await joinParticipantResponse.Content.ReadFromJsonAsync<JoinAsGuestGameResult>();
    }

    public async Task<CreateGameResponse?> CreateGame()
    {
        var requestData = await CreateGameRequest();
        var response = await _client.PostAsJsonAsync("/api/games", requestData);
        return await response.Content.ReadFromJsonAsync<CreateGameResponse>();
    }

    public async Task<CreateGameRequest> CreateGameRequest()
    {
        var votingSystem = await GetVotingSystem();
        votingSystem.Should().NotBeNull();
        return new CreateGameRequest(
                Name: GetName(),
                VotingSystemId: votingSystem!.Id,
                CreatorName: GetCreatorName(),
                IsAutoRevealCards: false
            );
    }

    public async Task<VotingSystemResult?> GetVotingSystem()
    {
        var response = await _client.GetAsync("/api/voting-systems");
        var responseBody = await response.Content.ReadAsStringAsync();
        #region agent log
        WriteDebugLog(
            hypothesisId: "H_JSON",
            message: "GetVotingSystem response",
            data: new
            {
                StatusCode = (int)response.StatusCode,
                ReasonPhrase = response.ReasonPhrase,
                BodyPreview = responseBody.Length > 500 ? responseBody[..500] : responseBody,
            });
        #endregion
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException(
                $"GetVotingSystem failed with {(int)response.StatusCode} {response.ReasonPhrase}. Body: {responseBody}");
        }

        List<VotingSystemResult>? matchResponse;
        try
        {
            matchResponse = JsonSerializer.Deserialize<List<VotingSystemResult>>(responseBody);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                $"GetVotingSystem response is not valid JSON array. Body: {responseBody}", ex);
        }

        return matchResponse?.ToList()[0];
    }

    public void SetToken(string? token)
    {
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    }

    public string GetName() => $"Game's Name {RandomString(5)}";
    public string GetCreatorName() => $"Creator Name {RandomString(5)}";
    public string GetParticipantName() => $"Participant Name {RandomString(5)}";
    public string GetTicketName() => $"Ticket Name {RandomString(5)}";

    private string RandomString(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
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
            // No-op: diagnostics only.
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
