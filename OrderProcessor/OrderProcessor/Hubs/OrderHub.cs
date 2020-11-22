using Microsoft.AspNetCore.SignalR;
using OrderDelivery.Dtos;
using OrderDelivery.Interfaces;
using OrderDelivery.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderDelivery.Hubs
{
    public class OrderHub : Hub
    {
        public const string OrdersReceived = "OrdersReceived";
        public const string OrderReceived = "OrderReceived";
        public const string OrderStatusUpdated = "OrderStatusUpdated";

        private readonly IOrderRepository _orderRepository;

        public OrderHub(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task GetAllOrders()
        {
            List<Order> orders = await _orderRepository.GetAllAsync();
            await Clients.Caller.SendAsync(OrdersReceived, orders);
        }

        public async Task CreateOrder(OrderDto orderDto)
        {
            Order order = CreateOrderFromDto(orderDto);
            await _orderRepository.AddAsync(order);

            await Clients.Others.SendAsync(OrderReceived, order);
        }

        public async Task UpdateOrderStatus(string orderId)
        {
            Order order = await _orderRepository.GetByIdAsync(orderId);
            order.UpdateStatus();
            await _orderRepository.UpdateAsync(order);

            await Clients.All.SendAsync(OrderStatusUpdated, orderId, order.Status);
        }

        private Order CreateOrderFromDto(OrderDto orderDto)
        {
            return new Order(orderDto.Id, orderDto.ProductName, orderDto.Quantity, orderDto.AddressLine, orderDto.City);
        }
    }
}
