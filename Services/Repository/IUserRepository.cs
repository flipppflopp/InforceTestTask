using DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repository
{
    public interface IUserRepository
    {
        public IEnumerable<User> Get();

        public User Get(int id);

        public void Post(User user);

        public void Put(User user);

        public void Delete(User user);
    }
}
