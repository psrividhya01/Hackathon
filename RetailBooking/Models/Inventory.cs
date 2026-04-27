namespace RetailBooking.Models;

public class Inventory
{
    public int Id { get; set; }
    public int ProductVariantId { get; set; }
    public ProductVariant ProductVariant { get; set; }
    public int Stock { get; set; }
}