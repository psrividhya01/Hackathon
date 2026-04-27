using RetailingOrderSystem.Models.Entities;

namespace RetailingOrderSystem.Services.Interfaces;

public interface IBrandService
{
    Task<List<Brand>> GetAll();
    Task<Brand?> GetById(int id);
    Task<string> Create(Brand model);
    Task<string> Update(int id, Brand model);
    Task<string> Delete(int id);
}
