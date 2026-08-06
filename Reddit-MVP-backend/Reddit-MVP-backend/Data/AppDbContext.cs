using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Reddit_MVP_backend.Models;

namespace Reddit_MVP_backend.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext (DbContextOptions<AppDbContext> options) :  base(options)
        {
                
        }

        public DbSet<TestEntity> TestEntities  { get; set; } 
    }
}
