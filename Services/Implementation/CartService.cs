using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Repositories.Interfaces;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Services.Implementation
{
    public class CartService:ICartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task AddToCart(int userId, int variantId, int quantity)
        {
            var cart = await _cartRepository.GetCartByUserId(userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId, CartItems = new List<CartItem>() };
                await _cartRepository.AddCartAsync(cart);
            }

            var item = new CartItem
            {
                ProductVariantId = variantId,
                Quantity = quantity
            };

            cart.CartItems.Add(item);

            await _cartRepository.SaveChangesAsync();
        }

    }
}
