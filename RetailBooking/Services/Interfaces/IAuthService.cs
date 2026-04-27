using RetailBooking.DTO;

namespace RetailBooking.Services.Interfaces;

public interface IAuthService
{
    Task<string> Register(RegisterRequest model);
    Task<string> Login(LoginRequest model);
}