using Microsoft.EntityFrameworkCore;
using RetailBooking.Data;
using RetailBooking.Models;
using RetailBooking.Services.Interfaces;

namespace RetailOrderingSystem.Services.Implementations
{
    public class BrandService : IBrandService
    {
        private readonly AppDbContext _context;

        public BrandService(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL
        public async Task<List<Brand>> GetAll()
        {
            return await _context.Brands.ToListAsync();
        }

        // GET BY ID
        public async Task<Brand> GetById(int id)
        {
            return await _context.Brands
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        // CREATE
        public async Task<string> Create(Brand model)
        {
            _context.Brands.Add(model);
            await _context.SaveChangesAsync();

            return "Brand Created Successfully";
        }

        // UPDATE
        public async Task<string> Update(int id, Brand model)
        {
            var brand = await _context.Brands
                .FirstOrDefaultAsync(x => x.Id == id);

            if (brand == null)
                return "Brand Not Found";

            brand.Name = model.Name;

            await _context.SaveChangesAsync();

            return "Brand Updated Successfully";
        }

        // DELETE
        public async Task<string> Delete(int id)
        {
            var brand = await _context.Brands
                .FirstOrDefaultAsync(x => x.Id == id);

            if (brand == null)
                return "Brand Not Found";

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return "Brand Deleted Successfully";
        }
    }
}