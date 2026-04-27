using RetailBooking.Models;

namespace RetailBooking.Services.Interfaces;

public interface IBrandService
{
    Task<List<Brand>> GetAll();
    Task<Brand> GetById(int id);
    Task<string> Create(Brand model);
    Task<string> Update(int id, Brand model);
    Task<string> Delete(int id);
}