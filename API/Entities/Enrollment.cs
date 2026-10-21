namespace API.Entities;

public enum EnrollmentStatus { NotStarted, InProgress, Completed }

public class Enrollment
{
   
    public int Id { get; set; }

    public int UserId { get; set; }

    public User User { get; set; } = null!;

    public int CourseId { get; set; }

    public Course Course { get; set; } = null!;

    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.NotStarted;

    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; } = null;

    public DateTime? CompletedAt { get; set; } = null;

}

