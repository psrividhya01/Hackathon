using Microsoft.EntityFrameworkCore;
using RetailBooking.Data;
using RetailBooking.Models;
using RetailBooking.Services.Interfaces;

namespace RetailBooking.Services.Implementation;

public class InventoryService : IInventoryService
    {
        private readonly AppDbContext _context;

        public InventoryService(AppDbContext context)
        {
            _context = context;
        }

        // GET ALL INVENTORY
        public async Task<List<Inventory>> GetAll()
        {
            return await _context.Inventories
                .Include(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .ToListAsync();
        }

        // GET BY VARIANT ID
        public async Task<Inventory> GetByVariantId(int variantId)
        {
            return await _context.Inventories
                .Include(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.ProductVariantId == variantId);
        }

        // CREATE INVENTORY
        public async Task<string> Create(Inventory model)
        {
            _context.Inventories.Add(model);
            await _context.SaveChangesAsync();

            return "Inventory Created Successfully";
        }

        // UPDATE INVENTORY STOCK
        public async Task<string> Update(int variantId, Inventory model)
        {
            var inventory = await _context.Inventories
                .FirstOrDefaultAsync(x => x.ProductVariantId == variantId);

            if (inventory == null)
                return "Inventory Not Found";

            inventory.Stock = model.Stock;

            await _context.SaveChangesAsync();

            return "Inventory Updated Successfully";
        }

        // DELETE INVENTORY
        public async Task<string> Delete(int variantId)
        {
            var inventory = await _context.Inventories
                .FirstOrDefaultAsync(x => x.ProductVariantId == variantId);

            if (inventory == null)
                return "Inventory Not Found";

            _context.Inventories.Remove(inventory);
            await _context.SaveChangesAsync();

            return "Inventory Deleted Successfully";
        }
    }