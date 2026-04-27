using RetailingOrderSystem.Models.Entities;

namespace RetailingOrderSystem.Services.Interfaces;

public interface IProductService
{
    Task<List<Product>> GetAll();
    Task<Product?> GetById(int id);
    Task<string> Create(Product model);
    Task<string> Update(int id, Product model);
    Task<string> Delete(int id);
}
