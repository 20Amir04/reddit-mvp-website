using Microsoft.AspNetCore.Mvc;

namespace Reddit_MVP_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok(new
        {
            status = "API is running"
        });
    }
}