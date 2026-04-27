using Microsoft.EntityFrameworkCore;
using RetailingOrderSystem.Models.Entities;

namespace RetailingOrderSystem.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        // BE1 DbSets
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

            modelBuilder.Entity<Order>()
                .Property(x => x.TotalAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
                .Property(x => x.Price)
                .HasPrecision(18, 2);
        }
    }
}

