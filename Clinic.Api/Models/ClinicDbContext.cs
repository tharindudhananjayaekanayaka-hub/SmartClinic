using Microsoft.EntityFrameworkCore;

namespace Clinic.Api.Models
{
    public class ClinicDbContext : DbContext
    {
        public ClinicDbContext(DbContextOptions<ClinicDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}