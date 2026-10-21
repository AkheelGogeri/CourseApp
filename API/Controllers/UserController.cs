using API.data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(AppDbContext context) : ControllerBase
{
        [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        return await context.Users
            .Where(u => u.IsActive)
            .Select(u => new UserDto
            {
                Id = u.Id,
                EmployeeId = u.EmployeeId,
                Name = u.Name,
                Email = u.Email,
                Department = u.Department,
                JoiningDate = u.JoiningDate,
                Role = u.Role
            })
            .ToListAsync();
    }
        
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await context.Users.FindAsync(id);
        if (user == null || !user.IsActive) return NotFound();

        return new UserDto
        {
            Id = user.Id,
            EmployeeId = user.EmployeeId,
            Name = user.Name,
            Email = user.Email,
            Department = user.Department,
            JoiningDate = user.JoiningDate,
            Role = user.Role
        };
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Register(CreateUserDto dto)
    {
        if (await context.Users.AnyAsync(u => u.Email == dto.Email))
            return Conflict("Email is already registered.");

        if (await context.Users.AnyAsync(u => u.EmployeeId == dto.EmployeeId))
            return Conflict("Employee ID is already registered.");

        var user = new User
        {
            EmployeeId = dto.EmployeeId,
            Name = dto.Name,
            Email = dto.Email.ToLower(),
            Department = dto.Department,
            JoiningDate = dto.JoiningDate
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var result = new UserDto
        {
            Id = user.Id,
            EmployeeId = user.EmployeeId,
            Name = user.Name,
            Email = user.Email,
            Department = user.Department,
            JoiningDate = user.JoiningDate,
            Role = user.Role
        };

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, result);
    }
}