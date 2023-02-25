using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InforceTaskAPI.Controllers
{
    [Route("api/urls")]
    [ApiController]
    public class URLController : ControllerBase
    {
        private readonly IURLRepository service;

        public URLController(IURLRepository _service)
        {
            service = _service;
        }

        [HttpGet]
        public IEnumerable<URL> Get()
        {
            return service.Get();
        }

        [HttpGet("{id}")]
        public URL Get(int id)
        {
            return service.Get(id);
        }

        [HttpPost]
        public URL Post(URL url)
        {
            return service.Post(url);
        }

        [HttpPut]
        public void Put(URL url)
        {
            service.Put(url);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            service.Delete(id);
        }
    }
}
