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

        private int CalculateID(string urlStr, int id)
        {
            int calculatedID = id;

            for (int i = 0; i < urlStr.Length; i++)
            {
                if ('a' <= urlStr[i] &&
                        urlStr[i] <= 'z')
                    id = id * 62 + urlStr[i] - 'a';
                if ('A' <= urlStr[i] &&
                        urlStr[i] <= 'Z')
                    id = id * 62 + urlStr[i] - 'A' + 26;
                if ('0' <= urlStr[i] &&
                        urlStr[i] <= '9')
                    id = id * 62 + urlStr[i] - '0' + 52;
            }

            return id;
        }

        public URL Post(URL url)
        {
            String urlStr = url.DefaultURL;
            if(_context.URLs.Any<URL>(c => c.DefaultURL == urlStr) == true) 
            {
                return null;
            }

            url.ShourtedURL = CalculateID(urlStr, 0).ToString();

            _context.URLs.Add(url);
            _context.SaveChanges();
            return _context.URLs.FirstOrDefault<URL>(c => c.DefaultURL == urlStr);
        }

        public void Put(URL url)
        {
            _context.URLs.Update(url);
            _context.SaveChanges();
        }

        public void Delete(int id) 
        {
            if (_context.URLs.Any<URL>(c => c.ID == id) != true)
            {
                return;
            }
            URL url = _context.URLs.FirstOrDefault<URL>(c => c.ID == id);


            _context.URLs.Remove(url);
            _context.SaveChanges();
        }
    }
}
