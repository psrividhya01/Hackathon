namespace RetailingOrderSystem.Services.Interfaces
{
    public interface ICartService
    {
        Task AddToCart(int userId, int variantId, int quantity);
    }
}
