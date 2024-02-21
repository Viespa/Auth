
using Microsoft.EntityFrameworkCore;
namespace api

{
    public class HomeDb : DbContext
    {
      
        public HomeDb(DbContextOptions<HomeDb> options) 
            : base(options){ }
        public DbSet<User> Users => Set<User>();
    }
    
}
