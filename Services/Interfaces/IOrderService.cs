namespace RetailingOrderSystem.Services.Interfaces
{
    public interface IOrderService
    {
        Task PlaceOrder(int userId);
    }
}
