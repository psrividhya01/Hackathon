using Microsoft.EntityFrameworkCore.Storage;
using RetailingOrderSystem.Models.Entities;

namespace RetailingOrderSystem.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        Task SaveChangesAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}