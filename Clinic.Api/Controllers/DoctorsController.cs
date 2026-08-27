using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Clinic.Api.Models;
using Clinic.Api.DTOs;

namespace Clinic.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly AppDbContext _context; // ඔයාලගේ DbContext නම මෙහි භාවිත කරන්න

    public DoctorsController(AppDbContext context)
    {
        _context = context;
    }

    // Admin ට පමණක් අලුත් වෛද්‍යවරයෙකු එකතු කළ හැක
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateDoctor([FromBody] CreateDoctorDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // User කෙනෙක් සිටීද සහ ඔහු Doctor Role එකේ සිටීදැයි පරීක්ෂා කිරීම
        var user = await _context.Users.FindAsync(dto.UserId);
        if (user == null || user.Role != "Doctor")
        {
            return BadRequest(new { message = "ලබාදුන් UserId එකට අදාළ වෛද්‍ය පරිශීලකයෙකු (Doctor Role) හමු නොවීය." });
        }

        var doctor = new Doctor
        {
            UserId = dto.UserId,
            Specialization = dto.Specialization,
            Fee = dto.Fee
        };

        _context.Doctors.Add(doctor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDoctors), new { id = doctor.Id }, doctor);
    }

    // සියලුම වෛද්‍යවරුන්ගේ ලැයිස්තුව ලබා ගැනීම (Patient / Admin සඳහා)
    [HttpGet]
    public async Task<IActionResult> GetDoctors()
    {
        var doctors = await _context.Doctors
            .Include(d => d.User)
            .Select(d => new 
            {
                d.Id,
                d.UserId,
                DoctorName = d.User != null ? d.User.Name : "",
                d.Specialization,
                d.Fee
            })
            .ToListAsync();

        return Ok(doctors);
    }
}