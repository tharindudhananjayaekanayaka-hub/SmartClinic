using System.ComponentModel.DataAnnotations;

namespace Clinic.Api.DTOs;

public class CreateDoctorDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public string Specialization { get; set; } = string.Empty;

    [Required]
    [Range(0, 1000000)]
    public decimal Fee { get; set; }
}