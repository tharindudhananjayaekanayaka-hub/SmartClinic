using System;

namespace Clinic.Api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; } // Foreign Key to User
        public User? Patient { get; set; }
        public int DoctorId { get; set; } // Foreign Key to Doctor
        public Doctor? Doctor { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; } = "Pending"; // "Pending", "Confirmed"
    }
}