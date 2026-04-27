using RetailingOrderSystem.Services.Interfaces;
using System.Net.Http.Json;

namespace RetailingOrderSystem.Services.Implementation
{
    public class InventoryApiService : IInventoryApiService
    {
        private readonly HttpClient _httpClient;

        public InventoryApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> ValidateStockAsync(int variantId, int quantity)
        {
            var response = await _httpClient.GetAsync(
                $"api/inventory/check?variantId={variantId}&quantity={quantity}");

            return response.IsSuccessStatusCode &&
                   await response.Content.ReadFromJsonAsync<bool>();
        }

        public async Task<string> DeductStockAsync(int variantId, int quantity)
        {
            var response = await _httpClient.PostAsJsonAsync(
                "api/inventory/deduct",
                new { variantId, quantity });

            if (!response.IsSuccessStatusCode)
                throw new Exception("Stock deduction failed");

            try
            {
                var result = await response.Content.ReadFromJsonAsync<string>();
                return string.IsNullOrEmpty(result) ? "Available" : result;
            }
            catch
            {
                // Fallback simulated status if the API doesn't return a string yet
                return "LowStock"; 
            }
        }
    }
}
