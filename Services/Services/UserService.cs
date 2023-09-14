using DB.Context;
using DB.Models;
using Services.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class UserService : IUserRepository
    {
        private readonly ApplicationContext _context;

        public UserService(ApplicationContext context)
        {
            _context = context;
        }

        public IEnumerable<User?> Get()
        {
            return _context.Users;
        }

        public User Get(int id)
        {
            return _context.Users.Find(id);
        }

        public User? Validate(User user)
        {
            return _context.Users.
                FirstOrDefault<User>(
                    c => 
                        c.Login == user.Login && c.Password == user.Password
                    );
        }

        public void Post(User? user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Put(User? user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(User? user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}
