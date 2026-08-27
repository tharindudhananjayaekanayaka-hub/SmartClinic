using Microsoft.AspNetCore.Mvc;
using Clinic.Api.Models;
using Clinic.Api.DTOs;

namespace Clinic.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        // Database ekak nathi nisa danata dummy data tikak demu
        private static List<Patient> patients = new List<Patient>
        {
            new Patient { Id = 1, Name = "Kamal Perera", Age = 30, ContactNumber = "0771234567" },
            new Patient { Id = 2, Name = "Nimali Silva", Age = 25, ContactNumber = "0719876543" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<PatientDto>> GetPatients()
        {
            var patientDtos = new List<PatientDto>();
            
            // Models eken DTO ekata data map kireema
            foreach (var patient in patients)
            {
                patientDtos.Add(new PatientDto
                {
                    Id = patient.Id,
                    Name = patient.Name,
                    Age = patient.Age
                });
            }
            
            return Ok(patientDtos);
        }
    }
}