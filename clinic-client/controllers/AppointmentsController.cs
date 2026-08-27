using Clinic.Api.DTOs;
using Clinic.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Clinic.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // ඔබගේ DbContext නම

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: /api/appointments (Patient Only)
        [HttpPost]
        [Authorize(Roles = "Patient")]
        public async Task<IActionResult> CreateAppointment([FromBody] CreateAppointmentDto dto)
        {
            // JWT Token එකෙන් ලොග් වී සිටින Patient ගේ UserId එක ලබා ගැනීම
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User is not authenticated.");
            }

            int patientId = int.Parse(userIdClaim);

            // වෛද්‍යවරයා පද්ධතියේ සිටීදැයි පරීක්ෂා කිරීම
            var doctorExists = await _context.Doctors.AnyAsync(d => d.Id == dto.DoctorId);
            if (!doctorExists)
            {
                return BadRequest("Invalid Doctor ID.");
            }

            var appointment = new Appointment
            {
                PatientId = patientId,
                DoctorId = dto.DoctorId,
                AppointmentDate = dto.AppointmentDate,
                Status = "Pending"
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Appointment booked successfully!", appointmentId = appointment.Id });
        }
    }
}