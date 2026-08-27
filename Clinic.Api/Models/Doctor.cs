namespace Clinic.Api.Models;

public class Doctor
{
    public int Id { get; set; }
    
    // Foreign Key to User
    public int UserId { get; set; }
    
    public string Specialization { get; set; } = string.Empty;
    public decimal Fee { get; set; }

    // Navigation Property
    public User? User { get; set; }
}