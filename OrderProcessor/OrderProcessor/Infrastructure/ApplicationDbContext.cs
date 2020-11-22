using Microsoft.EntityFrameworkCore;
using OrderDelivery.Models;

namespace OrderDelivery.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>().OwnsOne(o => o.Address);
        }
    }
}
