namespace OrderDelivery.Models
{
    public class Address
    {
        public string AddressLine { get; private set; }
        public string City { get; private set; }

        private Address()
        {
        }

        public Address(string addressLine, string city)
        {
            AddressLine = addressLine;
            City = city;
        }
    }
}
