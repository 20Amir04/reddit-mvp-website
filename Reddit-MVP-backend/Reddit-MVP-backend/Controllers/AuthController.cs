using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reddit_MVP_backend.DTOs;
using Reddit_MVP_backend.Models;

namespace Reddit_MVP_backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (string.IsNullOrWhiteSpace(registerDto.UserName))
            {
                return BadRequest(new {message = "Username is required"});
            }

            if (string.IsNullOrWhiteSpace(registerDto.Email))
            {
                return BadRequest(new { message = "Email is required" });
            }

            if (string.IsNullOrWhiteSpace(registerDto.Password))
            {
                return BadRequest(new { message = "Password is required" });
            }

            var existingUserByEmail = await _userManager.FindByEmailAsync(registerDto.Email);

            if (existingUserByEmail != null)
            {
                return BadRequest(new { message = "Email is already taken" });
            }

            var existingUserByUsername = await _userManager.FindByNameAsync(registerDto.UserName);

            if (existingUserByUsername != null)
            {
                return BadRequest(new { message = "Username is already taken" });
            }

            var user = new ApplicationUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Registarion failed",
                    errors = result.Errors.Select(error => error.Description)
                });
            }

            return Ok(new
            {
                message = "User registrated successfully",
                user = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.CreatedAt
                }
            });
        }
    }
}
