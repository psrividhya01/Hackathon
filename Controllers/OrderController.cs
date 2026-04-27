using Microsoft.AspNetCore.Mvc;
using RetailingOrderSystem.Models.DTOs;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Place([FromBody] PlaceOrderDto request)
        {
            try
            {
                await _service.PlaceOrder(request.UserId);
                return Ok("Order placed");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
