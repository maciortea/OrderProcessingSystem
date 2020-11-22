using Microsoft.EntityFrameworkCore;
using OrderDelivery.Interfaces;
using OrderDelivery.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderDelivery.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _db;

        public OrderRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Order> GetByIdAsync(string orderId)
        {
            return await _db.Orders.FindAsync(orderId);
        }

        public async Task<List<Order>> GetAllAsync()
        {
            return await _db.Orders.ToListAsync();
        }

        public async Task AddAsync(Order order)
        {
            await _db.Orders.AddAsync(order);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(Order order)
        {
            _db.Entry(order).State = EntityState.Modified;
            await _db.SaveChangesAsync();
        }
    }
}
