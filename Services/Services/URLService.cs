using DB.Context;
using DB.Models;
using Services.Repository;

namespace Services.Services;

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
        foreach (var t in urlStr)
        {
            switch (t)
            {
                case >= 'a' and <= 'z':
                    id = id * 62 + t - 'a';
                    break;
                case >= 'A' and <= 'Z':
                    id = id * 62 + t - 'A' + 26;
                    break;
                case >= '0' and <= '9':
                    id = id * 62 + t - '0' + 52;
                    break;
            }
        }

        return id;
    }

    public URL Post(URL url)
    {
        var urlStr = url.DefaultURL;
        if (_context.URLs.Any(c => c.DefaultURL == urlStr)) return null;

        url.ShourtedURL = CalculateID(urlStr, 0).ToString();

        _context.URLs.Add(url);
        _context.SaveChanges();
        return _context.URLs.FirstOrDefault(c => c.DefaultURL == urlStr);
    }

    public void Put(URL url)
    {
        _context.URLs.Update(url);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        if (_context.URLs.Any(c => c.ID == id) != true) return;
        var url = _context.URLs.FirstOrDefault(c => c.ID == id);


        _context.URLs.Remove(url);
        _context.SaveChanges();
    }
}