namespace OrderDelivery.Models
{
    public class Order
    {
        public string Id { get; private set; }
        public string ProductName { get; private set; }
        public int Quantity { get; private set; }
        public Address Address { get; private set; }
        public OrderStatus Status { get; private set; }

        private Order()
        {
        }

        public Order(string id, string productName, int quantity, string addressLine, string city)
        {
            Id = id;
            ProductName = productName;
            Quantity = quantity;
            Address = new Address(addressLine, city);
            Status = OrderStatus.New;
        }

        public void UpdateStatus()
        {
            Status = CalculateNextOrderStatus(Status);
        }

        private OrderStatus CalculateNextOrderStatus(OrderStatus currentStatus)
        {
            switch (currentStatus)
            {
                case OrderStatus.New:
                    return OrderStatus.Acknowledged;
                case OrderStatus.Acknowledged:
                    return OrderStatus.ProcessingStarted;
                case OrderStatus.ProcessingStarted:
                    return OrderStatus.ProcessingFinished;
                case OrderStatus.ProcessingFinished:
                case OrderStatus.Complete:
                default:
                    return OrderStatus.Complete;
            }
        }
    }
}
