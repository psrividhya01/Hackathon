using RetailBooking.Models;

namespace RetailBooking.Services.Interfaces;

public interface IVariantService
{
    Task<List<ProductVariant>> GetAll();
    Task<ProductVariant?> GetById(int id);
    Task<string> Create(ProductVariant model);
    Task<string> Update(int id, ProductVariant model);
    Task<string> Delete(int id);
}