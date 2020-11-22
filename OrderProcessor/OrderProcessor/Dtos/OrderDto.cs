namespace OrderDelivery.Dtos
{
    public class OrderDto
    {
        public string Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string AddressLine { get; set; }
        public string City { get; set; }
    }
}
