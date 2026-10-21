using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateUserDto
{
    [Required]
    public string EmployeeId { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Department { get; set; } = string.Empty;

    [Required]
    public DateOnly JoiningDate { get; set; }
}