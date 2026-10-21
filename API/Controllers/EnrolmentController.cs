using API.data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController(AppDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<EnrollmentDto>> Enroll(CreateEnrollmentDto dto)
    {
        var user = await context.Users.FindAsync(dto.UserId);
        if (user == null || !user.IsActive) return NotFound("User not found.");

        var course = await context.Courses.FindAsync(dto.CourseId);
        if (course == null || !course.IsActive) return NotFound("Course not found.");

        if (await context.Enrollments.AnyAsync(e => e.UserId == dto.UserId && e.CourseId == dto.CourseId))
            return Conflict("User is already enrolled in this course.");

        var enrollment = new Enrollment
        {
            UserId = dto.UserId,
            CourseId = dto.CourseId
        };

        context.Enrollments.Add(enrollment);
        await context.SaveChangesAsync();

        return Ok(new EnrollmentDto
        {
            Id = enrollment.Id,
            UserId = user.Id,
            UserName = user.Name,
            CourseId = course.Id,
            CourseTitle = course.Title,
            Status = enrollment.Status.ToString(),
            EnrolledAt = enrollment.EnrolledAt,
            CompletedAt = enrollment.CompletedAt
        });
    }

    [HttpGet]
    public async Task<ActionResult<List<EnrollmentDto>>> GetAll()
    {
        return await context.Enrollments
            .Include(e => e.User)
            .Include(e => e.Course)
            .Select(e => new EnrollmentDto
            {
                Id = e.Id,
                UserId = e.UserId,
                UserName = e.User.Name,
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                Status = e.Status.ToString(),
                EnrolledAt = e.EnrolledAt,
                CompletedAt = e.CompletedAt
            })
            .ToListAsync();
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<EnrollmentDto>>> GetForUser(int userId)
    {
        return await context.Enrollments
            .Where(e => e.UserId == userId)
            .Include(e => e.Course)
            .Include(e => e.User)
            .Select(e => new EnrollmentDto
            {
                Id = e.Id,
                UserId = e.UserId,
                UserName = e.User.Name,
                CourseId = e.CourseId,
                CourseTitle = e.Course.Title,
                Status = e.Status.ToString(),
                EnrolledAt = e.EnrolledAt,
                CompletedAt = e.CompletedAt
            })
            .ToListAsync();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, UpdateStatusDto dto)
    {
        var enrollment = await context.Enrollments.FindAsync(id);
        if (enrollment == null) return NotFound();

        enrollment.Status = dto.Status;
        enrollment.UpdatedAt = DateTime.UtcNow;
        enrollment.CompletedAt = dto.Status == EnrollmentStatus.Completed ? DateTime.UtcNow : null;

        await context.SaveChangesAsync();
        return NoContent();
    }
}