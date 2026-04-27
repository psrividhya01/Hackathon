using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailBooking.Models;
using RetailBooking.Services.Interfaces;

namespace RetailBooking.Controllers;

[ApiController]
[Route("api/variants")]
[Authorize(Roles = "Admin")]
public class VariantController : ControllerBase
{
    private readonly IVariantService _service;

    public VariantController(IVariantService service)
    {
        _service = service;
    }

    // GET: api/variants
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    // GET: api/variants/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetById(id));
    }

    // POST: api/variants
    [HttpPost]
    public async Task<IActionResult> Create(ProductVariant model)
    {
        return Ok(await _service.Create(model));
    }

    // PUT: api/variants/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ProductVariant model)
    {
        return Ok(await _service.Update(id, model));
    }

    // DELETE: api/variants/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _service.Delete(id));
    }
}