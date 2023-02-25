using DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repository
{
    public interface IURLRepository
    {
        public IEnumerable<URL> Get();

        public URL Get(int id);

        public URL Post(URL url);

        public void Put(URL url);

        public void Delete(int id);
    }
}
