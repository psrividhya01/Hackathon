using RetailingOrderSystem.Models.DTOs;

namespace RetailingOrderSystem.Services.Interfaces;

public interface IAuthService
{
    Task<string> Register(RegisterRequest model);
    Task<string> Login(LoginRequest model);
}
