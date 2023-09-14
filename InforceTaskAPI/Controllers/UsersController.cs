using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Repository;

namespace InforceTaskAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository service;

        public UsersController(IUserRepository _service)
        {
            service = _service;
        }

        [HttpGet]
        public IEnumerable<User?> Get()
        {
            return service.Get();
        }

        [HttpGet("{id}")]
        public User Get(int id)
        {
            return service.Get(id);
        }

        [HttpPost]
        [Route("validate")]
        public User? Validate(User user)
        {
            User? result = service.Validate(user);
            return result;
        }

        [HttpPost]
        public void Post(User? user)
        {
            service.Post(user);
        }

        [HttpPut]
        public void Put(User? user)
        {
            service.Put(user);
        }

        [HttpDelete]
        public void Delete(User? user)
        {
            service.Delete(user);
        }
    }
}
