namespace Clinic.Api.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string ContactNumber { get; set; } = string.Empty;
    }
}