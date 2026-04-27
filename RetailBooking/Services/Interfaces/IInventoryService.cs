using RetailBooking.Models;

namespace RetailBooking.Services.Interfaces;

public interface IInventoryService
{
    
    Task<List<Inventory>> GetAll();
    Task<Inventory?> GetByVariantId(int variantId);
    Task<string> Create(Inventory model);
    Task<string> Update(int variantId, Inventory model);
    Task<string> Delete(int variantId);
}