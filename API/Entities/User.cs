namespace API.Entities;

public class User
{
    public int Id{get; set;}

    public required string EmployeeId{get; set;}

    public required string Name{get; set;}

    public required string Email{get; set;}

    public required string Department{get; set;}

    public required DateOnly JoiningDate{get; set;}

    public string Role{get; set;} ="User";

    public bool IsActive{get; set;} = true;

    public DateTime CreatedAt{get; set;} =DateTime.UtcNow;

    public List<Enrollment> Enrollments{get;set;} = [];

}
