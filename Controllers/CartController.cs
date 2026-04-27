using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RetailingOrderSystem.Models.DTOs;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto request)
        {
            await _cartService.AddToCart(request.UserId, request.VariantId, request.Quantity);
            return Ok("Item added to cart");
        }
    }
}
