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

        public IEnumerable<User> Get()
        {
            return _context.Users;
        }

        public User Get(int id)
        {
            return _context.Users.Find(id);
        }

        public void Post(User user)
        {
            _context.Users.Add(user);
        }

        public void Put(User user)
        {
            _context.Users.Update(user);
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
        }
    }
}
