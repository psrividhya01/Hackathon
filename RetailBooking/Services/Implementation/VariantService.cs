using Microsoft.EntityFrameworkCore;
using RetailBooking.Data;
using RetailBooking.Models;
using RetailBooking.Services.Interfaces;

namespace RetailBooking.Services.Implementation;

public class VariantService : IVariantService
{
    private readonly AppDbContext _context;

    public VariantService(AppDbContext context)
    {
        _context = context;
    }

    // GET ALL VARIANTS
    public async Task<List<ProductVariant>> GetAll()
    {
        return await _context.ProductVariants
            .Include(x => x.Product)
            .ToListAsync();
    }

    // GET VARIANT BY ID
    public async Task<ProductVariant?> GetById(int id)
    {
        return await _context.ProductVariants
            .Include(x => x.Product)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    // CREATE VARIANT
    public async Task<string> Create(ProductVariant model)
    {
        _context.ProductVariants.Add(model);
        await _context.SaveChangesAsync();

        return "Variant Created Successfully";
    }

    // UPDATE VARIANT
    public async Task<string> Update(int id, ProductVariant model)
    {
        var variant = await _context.ProductVariants
            .FirstOrDefaultAsync(x => x.Id == id);

        if (variant == null)
            return "Variant Not Found";

        variant.ProductId = model.ProductId;
        variant.VariantName = model.VariantName;
        variant.Price = model.Price;

        await _context.SaveChangesAsync();

        return "Variant Updated Successfully";
    }

    // DELETE VARIANT
    public async Task<string> Delete(int id)
    {
        var variant = await _context.ProductVariants
            .FirstOrDefaultAsync(x => x.Id == id);

        if (variant == null)
            return "Variant Not Found";

        _context.ProductVariants.Remove(variant);
        await _context.SaveChangesAsync();

        return "Variant Deleted Successfully";
    }
}
