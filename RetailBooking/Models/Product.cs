namespace RetailBooking.Models;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int BrandId { get; set; }
    public Brand? Brand { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
}