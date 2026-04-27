using Microsoft.AspNetCore.SignalR;
using RetailingOrderSystem.Data;
using RetailingOrderSystem.Hubs;
using RetailingOrderSystem.Models.Entities;
using RetailingOrderSystem.Repositories.Interfaces;
using RetailingOrderSystem.Services.Interfaces;

namespace RetailingOrderSystem.Services.Implementation
{
    public class OrderService : IOrderService
    {
        private readonly ICartRepository _cartRepo;
        private readonly IOrderRepository _orderRepo;
        private readonly IInventoryApiService _inventoryApi;
        private readonly IHubContext<StockHub> _hubContext;
        private readonly ILogger<OrderService> _logger;

        public OrderService(
            ICartRepository cartRepo,
            IOrderRepository orderRepo,
            IInventoryApiService inventoryApi,
            IHubContext<StockHub> hubContext,
            ILogger<OrderService> logger)
        {
            _cartRepo = cartRepo;
            _orderRepo = orderRepo;
            _inventoryApi = inventoryApi;
            _hubContext = hubContext;
            _logger = logger;
        }

        public async Task PlaceOrder(int userId)
        {
            using var transaction = await _orderRepo.BeginTransactionAsync();

            try
            {
                var cart = await _cartRepo.GetCartByUserId(userId);

                if (cart == null || !cart.CartItems.Any())
                    throw new Exception("Cart empty");

                // Validate stock
                foreach (var item in cart.CartItems)
                {
                    if (!await _inventoryApi.ValidateStockAsync(item.ProductVariantId, item.Quantity))
                        throw new Exception("Out of stock");
                }

                var order = new Order
                {
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Status = "Confirmed",
                    OrderItems = new List<OrderItem>()
                };

                decimal total = 0;

                foreach (var item in cart.CartItems)
                {
                    var price = 100; // simulate (should come from product API)

                    order.OrderItems.Add(new OrderItem
                    {
                        ProductVariantId = item.ProductVariantId,
                        Quantity = item.Quantity,
                        Price = price
                    });

                    total += price * item.Quantity;

                    var stockStatus = await _inventoryApi.DeductStockAsync(item.ProductVariantId, item.Quantity);

                    // Trigger Real-time Event
                    try
                    {
                        await _hubContext.Clients.Group("products").SendAsync(
                            "StockUpdated",
                            new
                            {
                                VariantId = item.ProductVariantId,
                                Status = stockStatus
                            }
                        );
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "SignalR failed to send StockUpdated event for variant {VariantId}", item.ProductVariantId);
                    }
                }

                order.TotalAmount = total;

                await _orderRepo.AddOrderAsync(order);

                _cartRepo.RemoveCartItems(cart.CartItems);

                await _orderRepo.SaveChangesAsync();
                await _cartRepo.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
