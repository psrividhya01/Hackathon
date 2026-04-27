using RetailBooking.Models;

namespace RetailBooking.Services.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAll();
    Task<Category> GetById(int id);
    Task<string> Create(Category model);
    Task<string> Update(int id, Category model);
    Task<string> Delete(int id);
}