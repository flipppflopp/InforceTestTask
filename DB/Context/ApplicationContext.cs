using DB.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User?> Users { get ; set; }

        public DbSet<URL> URLs { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
