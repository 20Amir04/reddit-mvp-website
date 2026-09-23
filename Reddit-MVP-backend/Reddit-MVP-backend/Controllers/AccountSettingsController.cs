using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reddit_MVP_backend.DTOs;
using Reddit_MVP_backend.Models;

namespace Reddit_MVP_backend.Controllers
{
    [ApiController]
    [Route("api/account")]
    [Authorize]
    public class AccountSettingsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountSettingsController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPut("email")]
        public async Task<IActionResult> UpdateEmail([FromBody] UpdateEmailDto updateEmailDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new {message = "User not found."});
            }

            var newEmail = updateEmailDto.NewEmail.Trim();

            if (string.IsNullOrWhiteSpace(newEmail))
            {
                return BadRequest(new { message = "Email is required." });
            }

            var existingUser = await _userManager.FindByEmailAsync(newEmail);

            if (existingUser != null && existingUser.Id != user.Id)
            {
                return BadRequest(new { message = "Email is already in use." });
            }

            user.Email = newEmail;
            user.UserName = user.UserName;
            user.NormalizedEmail = newEmail.ToUpper();

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Failed to update email",
                    errors = result.Errors.Select(error => error.Description)
                });
            }

            return Ok(new
            {
                message = "Email updated successfully",
                email = user.Email
            });
        }

        [HttpPut("password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDto updatePasswordDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace (userId))
            {
                return Unauthorized(new { message = "Invalid token." });
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (string.IsNullOrWhiteSpace(updatePasswordDto.CurrentPassword))
            {
                return BadRequest(new { message = "Current password is required" });
            }

            if (string.IsNullOrWhiteSpace(updatePasswordDto.NewPassword))
            {
                return BadRequest(new { message = "New password is required" });
            }

            var result = await _userManager.ChangePasswordAsync(
                user,
                updatePasswordDto.CurrentPassword,
                updatePasswordDto.NewPassword
            );

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Failed to update password",
                    errors = result.Errors.Select(error => error.Description)
                });
            }

            return Ok(new { message = "Password updated successfully" });
        }
    }
}
