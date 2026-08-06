using Microsoft.AspNetCore.Identity;

namespace Reddit_MVP_backend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
