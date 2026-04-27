using RetailingOrderSystem.Data;
using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace RetailingOrderSystem.Repositories.Implementation
{
    public class CartRepository:ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> GetCartByUserId(int userId)
        {
            return await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task AddCartItem(CartItem item)
        {
            await _context.CartItems.AddAsync(item);
        }

        public async Task AddCartAsync(Cart cart)
        {
            await _context.Carts.AddAsync(cart);
        }

        public void RemoveCartItems(IEnumerable<CartItem> items)
        {
            _context.CartItems.RemoveRange(items);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
