using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Course> Courses{get; set;}
    public DbSet<Enrollment> Enrollments{get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.EmployeeId).IsUnique();
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

        modelBuilder.Entity<Enrollment>()
            .HasIndex(e => new{e.UserId, e.CourseId}).IsUnique();

        modelBuilder.Entity<Enrollment>()
            .Property(e => e.Status).HasConversion<string>();

    }        
}
