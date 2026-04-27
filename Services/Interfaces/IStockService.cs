namespace RetailingOrderSystem.Services.Interfaces
{
    public interface IStockService
    {
        Task ValidateStockAsync(int variantId, int quantity);
        Task DeductStockAsync(int variantId, int quantity);
    }
}
