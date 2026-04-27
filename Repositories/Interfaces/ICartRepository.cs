using RetailingOrderSystem.Models.Entities;

namespace RetailingOrderSystem.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserId(int userId);
        Task AddCartAsync(Cart cart);
        Task AddCartItem(CartItem item);
        void RemoveCartItems(IEnumerable<CartItem> items);
        Task SaveChangesAsync();
    }
}
