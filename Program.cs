using Microsoft.EntityFrameworkCore;
using RetailingOrderSystem.Data;
using RetailingOrderSystem.Repositories.Implementation;
using RetailingOrderSystem.Repositories.Interfaces;
using RetailingOrderSystem.Hubs;
using RetailingOrderSystem.Services.Implementation;
using RetailingOrderSystem.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddHttpClient<IInventoryApiService, InventoryApiService>(c =>
{
    c.BaseAddress = new Uri("https://localhost:5001/");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<StockHub>("/stockHub");

app.Run();
