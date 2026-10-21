using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateEnrollmentDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int CourseId { get; set; }
}