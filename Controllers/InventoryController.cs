using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Controllers;

[ApiController]
[Route("api/inventory")]
public class InventoryController : ControllerBase
{
    private readonly IInventoryService _service;

    public InventoryController(IInventoryService service)
    {
        _service = service;
    }

    // GET: api/inventory
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    // GET: api/inventory/1
    [HttpGet("{variantId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetByVariantId(int variantId)
    {
        var inventory = await _service.GetByVariantId(variantId);
        return inventory is null ? NotFound("Inventory Not Found") : Ok(inventory);
    }

    // POST: api/inventory
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(Inventory model)
    {
        return Ok(await _service.Create(model));
    }

    // PUT: api/inventory/1
    [HttpPut("{variantId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int variantId, [FromBody] Inventory model)
    {
        return Ok(await _service.Update(variantId, model));
    }

    // DELETE: api/inventory/1
    [HttpDelete("{variantId}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int variantId)
    {
        return Ok(await _service.Delete(variantId));
    }

    // GET: api/inventory/check?variantId=1&quantity=2  (used by BE2 InventoryApiService)
    [HttpGet("check")]
    [AllowAnonymous]
    public async Task<IActionResult> CheckStock([FromQuery] int variantId, [FromQuery] int quantity)
    {
        var inventory = await _service.GetByVariantId(variantId);
        if (inventory == null) return Ok(false);
        return Ok(inventory.Stock >= quantity);
    }

    // POST: api/inventory/deduct  (used by BE2 InventoryApiService)
    [HttpPost("deduct")]
    [AllowAnonymous]
    public async Task<IActionResult> Deduct([FromBody] DeductRequest request)
    {
        var inventory = await _service.GetByVariantId(request.VariantId);
        if (inventory == null)
            return BadRequest("Inventory not found");

        if (inventory.Stock < request.Quantity)
            return BadRequest("Insufficient stock");

        inventory.Stock -= request.Quantity;

        string stockStatus = inventory.Stock == 0 ? "OutOfStock"
                           : inventory.Stock <= 3 ? "LowStock"
                           : "Available";

        await _service.Update(request.VariantId, inventory);

        return Ok(stockStatus);
    }
}

public class DeductRequest
{
    public int VariantId { get; set; }
    public int Quantity { get; set; }
}
