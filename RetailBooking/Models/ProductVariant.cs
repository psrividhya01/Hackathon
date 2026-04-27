namespace RetailBooking.Models;

public class ProductVariant
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public string VariantName { get; set; }
    public decimal Price { get; set; }
}