using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RetailingOrderSystem.Data;
using RetailingOrderSystem.Models.DTOs;
using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Services.Implementation;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<string> Register(RegisterRequest model)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == model.Email);

        if (existingUser != null)
            return "Email already exists";

        var user = new User
        {
            Name = model.Username,
            Email = model.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
            Role = model.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return "User Registered Successfully";
    }

    public async Task<string> Login(LoginRequest model)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == model.Email);

        if (user == null)
            return "Invalid Email";

        bool validPassword = BCrypt.Net.BCrypt.Verify(
            model.Password,
            user.Password
        );

        if (!validPassword)
            return "Invalid Password";

        return GenerateToken(user);
    }

    private string GenerateToken(User user)
    {
        var jwtKey = _config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is missing.");
        var jwtIssuer = _config["Jwt:Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer is missing.");
        var jwtAudience = _config["Jwt:Audience"] ?? throw new InvalidOperationException("Jwt:Audience is missing.");

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("UserId", user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

        var creds = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
