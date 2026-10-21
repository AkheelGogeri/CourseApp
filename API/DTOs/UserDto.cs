namespace API.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public DateOnly JoiningDate { get; set; }
    public string Role { get; set; } = string.Empty;
}