using RetailingOrderSystem.Data;
using Microsoft.EntityFrameworkCore;
using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Services.Implementation;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAll()
    {
        return await _context.Categories.ToListAsync();
    }

 
    public async Task<Category?> GetById(int id)
    {
        return await _context.Categories
            .FirstOrDefaultAsync(x => x.Id == id);
    }

  
    public async Task<string> Create(Category model)
    {
        _context.Categories.Add(model);
        await _context.SaveChangesAsync();

        return "Category Created Successfully";
    }

 
    public async Task<string> Update(int id, Category model)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(x => x.Id == id);

        if (category == null)
            return "Category Not Found";

        category.Name = model.Name;

        await _context.SaveChangesAsync();

        return "Category Updated Successfully";
    }

 
    public async Task<string> Delete(int id)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(x => x.Id == id);

        if (category == null)
            return "Category Not Found";

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return "Category Deleted Successfully";
    }
}

