using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using API.data;
using API.Entities;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        return await context.Courses.Where(c => c.IsActive).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourse(int id)
    {
        var course = await context.Courses.FindAsync(id);
        if (course == null || !course.IsActive) return NotFound();
        return course;
    }

    [HttpPost]
    public async Task<ActionResult<Course>> CreateCourse(CreateCourseDto dto)
    {
        var course = new Course
        {
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category,
            DurationHours = dto.DurationHours
        };

        context.Courses.Add(course);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, CreateCourseDto dto)
    {
        var course = await context.Courses.FindAsync(id);
        if (course == null || !course.IsActive) return NotFound();

        course.Title = dto.Title;
        course.Description = dto.Description;
        course.Category = dto.Category;
        course.DurationHours = dto.DurationHours;

        await context.SaveChangesAsync();
        return NoContent();
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await context.Courses.FindAsync(id);
        if (course == null || !course.IsActive) return NotFound();

        course.IsActive = false;
        await context.SaveChangesAsync();
        return NoContent();
    }

}
