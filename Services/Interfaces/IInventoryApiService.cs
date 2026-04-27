namespace RetailingOrderSystem.Services.Interfaces
{
    public interface IInventoryApiService
    {
        Task<bool> ValidateStockAsync(int variantId, int quantity);
        Task<string> DeductStockAsync(int variantId, int quantity);
    }
}
