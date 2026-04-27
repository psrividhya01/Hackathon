using Microsoft.AspNetCore.Mvc;
using RetailingOrderSystem.Models.DTOs;
using RetailingOrderSystem.Services.Implementation;
using RetailingOrderSystem.Services.Interfaces;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
        _service = service;
    }

    // POST: api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest model)
    {
        try
        {
            var result = await _service.Register(model);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest model)
    {
        try
        {
            var result = await _service.Login(model);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

