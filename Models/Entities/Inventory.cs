namespace RetailingOrderSystem.Models.Entities;

public class Inventory
{
    public int Id { get; set; }
    public int ProductVariantId { get; set; }
    public required ProductVariant ProductVariant { get; set; }
    public int Stock { get; set; }
}
