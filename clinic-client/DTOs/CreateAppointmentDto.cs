namespace Clinic.Api.DTOs
{
    public class CreateAppointmentDto
    {
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
    }
}