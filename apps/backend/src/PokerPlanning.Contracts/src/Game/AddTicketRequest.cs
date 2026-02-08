using System.ComponentModel.DataAnnotations;
using PokerPlanning.Domain.src.Models.TicketAggregate.Enums;

namespace PokerPlanning.Contracts.src.Game;

public record AddTicketRequest(
    [Required(ErrorMessage = "Title is required"),
    MinLength(1, ErrorMessage = "The Title must have a minimum length of 1"),
    MaxLength(255, ErrorMessage = "The Title can't exceed 255 characters.")]
    string Title,
    [Required(ErrorMessage = "Type is required"), EnumDataType(typeof(TicketType))]
    TicketType Type
);
