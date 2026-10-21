namespace API.Entities;

public class Course
{
    public int Id{get; set; }

    public required string Title{get; set;}

    public string? Description{get; set; }

    public int DurationHours {get; set;} 

    public bool IsActive{get; set;} = true;

    public required string Category{ get; set; }
        
    public DateTime CreatedAt{ get; set;} = DateTime.UtcNow;
    
    public List<Enrollment> Enrollments{get;set;} = [];
}