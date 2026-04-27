using Microsoft.EntityFrameworkCore;
using RetailingOrderSystem.Data;
using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Services.Implementation;

public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    
    public async Task<List<Product>> GetAll()
    {
        return await _context.Products
            .Include(x => x.Category)
            .Include(x => x.Brand)
            .ToListAsync();
    }

   
    public async Task<Product?> GetById(int id)
    {
        return await _context.Products
            .Include(x => x.Category)
            .Include(x => x.Brand)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    
    public async Task<string> Create(Product model)
    {
        _context.Products.Add(model);
        await _context.SaveChangesAsync();

        return "Product Created Successfully";
    }


    public async Task<string> Update(int id, Product model)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
            return "Product Not Found";

        product.Name = model.Name;
        product.CategoryId = model.CategoryId;
        product.BrandId = model.BrandId;
       

        await _context.SaveChangesAsync();

        return "Product Updated Successfully";
    }

    
    public async Task<string> Delete(int id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
            return "Product Not Found";

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return "Product Deleted Successfully";
    }
}

