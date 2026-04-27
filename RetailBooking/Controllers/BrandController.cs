using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailBooking.Models;
using RetailBooking.Services.Interfaces;

namespace RetailBooking.Controllers;
[ApiController]
[Route("api/brands")]
[Authorize(Roles = "Admin")]
public class BrandController : ControllerBase
{
    private readonly IBrandService _service;

    public BrandController(IBrandService service)
    {
        _service = service;
    }

    // GET: api/brands
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    // GET: api/brands/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var brand = await _service.GetById(id);
        return brand is null ? NotFound("Brand Not Found") : Ok(brand);
    }

    // POST: api/brands
    [HttpPost]
    public async Task<IActionResult> Create(Brand model)
    {
        return Ok(await _service.Create(model));
    }

    // PUT: api/brands/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Brand model)
    {
        return Ok(await _service.Update(id, model));
    }

    // DELETE: api/brands/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _service.Delete(id));
    }
}