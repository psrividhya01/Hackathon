using RetailingOrderSystem.Models.DTOs;

namespace RetailingOrderSystem.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> Register(RegisterRequest model);
    Task<AuthResponseDto> Login(LoginRequest model);
}
