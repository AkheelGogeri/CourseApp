using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateCourseDto
{
   [Required, MaxLength(150)]    
   public string Title{get; set;}=string.Empty;

   public string? Description{get; set;}

   [Required]
   public string Category{get; set;}=string.Empty;

   [Range(1,1000)]
   public int DurationHours{get; set;} 
}
