namespace Clinic.Api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Foreign Key
        public User? User { get; set; }
        public string Specialization { get; set; } = string.Empty;
        public decimal Fee { get; set; }
    }
}