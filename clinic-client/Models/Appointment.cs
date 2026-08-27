namespace Clinic.Api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; } = "Pending";

        // Navigation Properties (Optional)
        public User? Patient { get; set; }
        public Doctor? Doctor { get; set; }
    }
}