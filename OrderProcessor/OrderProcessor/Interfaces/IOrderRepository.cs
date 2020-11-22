using OrderDelivery.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderDelivery.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> GetByIdAsync(string orderId);
        Task<List<Order>> GetAllAsync();
        Task AddAsync(Order order);
        Task UpdateAsync(Order order);
    }
}
