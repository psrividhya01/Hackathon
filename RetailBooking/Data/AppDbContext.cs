using Microsoft.EntityFrameworkCore;
using RetailBooking.Models;

namespace RetailBooking.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
     public DbSet<Product> Products => Set<Product>();
     public DbSet<Brand> Brands => Set<Brand>();
     public DbSet<ProductVariant> ProductVariants => Set<ProductVariant>();
     public DbSet<Inventory> Inventories => Set<Inventory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ProductVariant>()
            .Property(x => x.Price)
            .HasPrecision(18, 2);
    }
        
}
