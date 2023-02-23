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
    public class URLService : IURLRepository
    {
        private readonly ApplicationContext _context;

        public URLService(ApplicationContext context)
        {
            _context = context;
        }

        public IEnumerable<URL> Get()
        {
            return _context.URLs;
        }

        public URL Get(int id)
        {
            return _context.URLs.Find(id);
        }

        public void Post(URL url)
        {
            _context.URLs.Add(url);
        }

        public void Put(URL url) 
        {
            _context.URLs.Update(url);
        }

        public void Delete(URL url) 
        {
            _context.URLs.Remove(url);
        }
    }
}
