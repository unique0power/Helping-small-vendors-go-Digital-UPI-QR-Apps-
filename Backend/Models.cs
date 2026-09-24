using System;
using System.Collections.Generic;

namespace DigitalDukaan.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Vendor"; // Admin or Vendor

        public ICollection<Business> Businesses { get; set; } = new List<Business>();
    }

    public class Business
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public string BusinessName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string OpeningHours { get; set; } = string.Empty;
        public int DigitalScore { get; set; } = 0;

        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<Sale> Sales { get; set; } = new List<Sale>();
        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();
        public ICollection<Bill> Bills { get; set; } = new List<Bill>();
        public ICollection<DigitalTool> DigitalTools { get; set; } = new List<DigitalTool>();
    }

    public class Product
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public Business? Business { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }

    public class Sale
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public Business? Business { get; set; }
        public int ProductId { get; set; }
        public decimal Amount { get; set; }
        public int Quantity { get; set; }
        public string PaymentMethod { get; set; } = string.Empty; // UPI, Cash, Card
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }

    public class Expense
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public Business? Business { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Notes { get; set; } = string.Empty;
    }

    public class Bill
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public Business? Business { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        // In a real app we'd have BillItems, but keeping it simple as requested or we can store items as JSON
        public string ItemsJson { get; set; } = "[]"; 
    }

    public class DigitalTool
    {
        public int Id { get; set; }
        public int BusinessId { get; set; }
        public Business? Business { get; set; }
        public string ToolName { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending, Active
    }
}
