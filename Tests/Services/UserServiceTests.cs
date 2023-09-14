using System;
using System.Collections.Generic;
using System.Linq;
using DB.Context;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using Services.Repository;
using Services.Services;
using Xunit;

namespace Tests
{
    public class UserServiceTests : IDisposable
    {
        private readonly ApplicationContext _context;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new ApplicationContext(options);
            _userService = new UserService(_context);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        [Fact]
        public void Get_ReturnsAllUsers()
        {
            // Arrange
            var users = new List<User>
            {
                new User { ID = 1, Login = "user1", Password = "password1" },
                new User { ID = 2, Login = "user2", Password = "password2" }
            };
            _context.Users.AddRange(users);
            _context.SaveChanges();

            // Act
            var result = _userService.Get();

            // Assert
            Assert.Equal(users, result);
        }

        [Fact]
        public void Get_ReturnsUserById()
        {
            // Arrange
            var user = new User { ID = 1, Login = "user1", Password = "password1" };
            _context.Users.Add(user);
            _context.SaveChanges();

            // Act
            var result = _userService.Get(1);

            // Assert
            Assert.Equal(user, result);
        }

        [Fact]
        public void Validate_ReturnsUserForValidCredentials()
        {
            // Arrange
            var user = new User { ID = 1, Login = "user1", Password = "password1" };
            _context.Users.Add(user);
            _context.SaveChanges();

            var inputUser = new User { Login = "user1", Password = "password1" };

            // Act
            var result = _userService.Validate(inputUser);

            // Assert
            Assert.Equal(user, result);
        }

        [Fact]
        public void Validate_ReturnsNullForInvalidCredentials()
        {
            // Arrange
            var user = new User { ID = 1, Login = "user1", Password = "password1" };
            _context.Users.Add(user);
            _context.SaveChanges();

            var inputUser = new User { Login = "user1", Password = "wrongpassword" };

            // Act
            var result = _userService.Validate(inputUser);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void Post_CreatesNewUser()
        {
            // Arrange
            var newUser = new User { Login = "newuser", Password = "newpassword" };

            // Act
            _userService.Post(newUser);

            // Assert
            var createdUser = _context.Users.FirstOrDefault(u => u.Login == "newuser");
            Assert.NotNull(createdUser);
        }

        [Fact]
        public void Put_UpdatesUser()
        {
            // Arrange
            var user = new User { ID = 1, Login = "user1", Password = "password1" };
            _context.Users.Add(user);
            _context.SaveChanges();
            user.Password = "newpassword";

            // Act
            _userService.Put(user);

            // Assert
            var updatedUser = _context.Users.Find(1);
            Assert.Equal("newpassword", updatedUser.Password);
        }

        [Fact]
        public void Delete_RemovesUser()
        {
            // Arrange
            var user = new User { ID = 1, Login = "user1", Password = "password1" };
            _context.Users.Add(user);
            _context.SaveChanges();

            // Act
            _userService.Delete(user);

            // Assert
            var deletedUser = _context.Users.Find(1);
            Assert.Null(deletedUser);
        }
    }
}
