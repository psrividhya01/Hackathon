using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailBooking.Models;
using RetailBooking.Services.Interfaces;

namespace RetailBooking.Controllers;

[ApiController]
[Route("api/inventory")]
[Authorize(Roles = "Admin")]
public class InventoryController : ControllerBase
{
    private readonly IInventoryService _service;

    public InventoryController(IInventoryService service)
    {
        _service = service;
    }

    // GET: api/inventory
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    // GET: api/inventory/1
    [HttpGet("{variantId}")]
    public async Task<IActionResult> GetByVariantId(int variantId)
    {
        return Ok(await _service.GetByVariantId(variantId));
    }

    // POST: api/inventory
    [HttpPost]
    public async Task<IActionResult> Create(Inventory model)
    {
        return Ok(await _service.Create(model));
    }

    // PUT: api/inventory/1
    [HttpPut("{variantId}")]
    public async Task<IActionResult> Update(int variantId, Inventory model)
    {
        return Ok(await _service.Update(variantId, model));
    }

    // DELETE: api/inventory/1
    [HttpDelete("{variantId}")]
    public async Task<IActionResult> Delete(int variantId)
    {
        return Ok(await _service.Delete(variantId));
    }
}