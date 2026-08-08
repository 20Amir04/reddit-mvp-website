using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reddit_MVP_backend.DTOs;
using Reddit_MVP_backend.Models;
using Reddit_MVP_backend.Services;

namespace Reddit_MVP_backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtTokenService _jwtTokenService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(UserManager<ApplicationUser> userManager, JwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
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

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (string.IsNullOrWhiteSpace(loginDto.Login))
            {
                return BadRequest(new { message = "Username or Email is required" });
            }

            if (string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest(new {message = "Password is required."});
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Login);

            if (user == null)
            {
                user = await _userManager.FindByNameAsync(loginDto.Login);
            }

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username/email or password" });
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Invalid username/email or password" });
            }

            var token = _jwtTokenService.CreateToken(user);

            return Ok(new
            {
                message = "Login successful",
                token,
                user = new
                {
                    id = user.Id,
                    username = user.UserName,
                    email = user.Email,
                    CreatedAt = user.CreatedAt
                }
            });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            return Ok(new
            {
                id = user.Id,
                username = user.UserName,
                email = user.Email,
                createdAt = user.CreatedAt
            });
        }
    }
}
