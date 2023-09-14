using DB.Context;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using Services.Repository;
using Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Tests
{
    public class URLServiceTests : IDisposable
    {
        private ApplicationContext _context;
        private URLService _urlService;

        public URLServiceTests()
        {
            var guid = Guid.NewGuid().ToString();
            var options = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(guid)
                .Options;
            _context = new ApplicationContext(options);
            _urlService = new URLService(_context);
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        [Fact]
        public void Get_ReturnsAllURLs()
        {
            // Arrange
            var urls = new List<URL>
            {
                new URL { ID = 1, DefaultURL = "http://example1.com", ShourtedURL = "" },
                new URL { ID = 2, DefaultURL = "http://example2.com", ShourtedURL = "" },
            };
            _context.URLs.AddRange(urls);
            _context.SaveChanges();

            // Act
            var result = _urlService.Get();

            // Assert
            Assert.Equal(urls, result);
        }

        [Fact]
        public void Get_ReturnsURLById()
        {
            // Arrange
            var url = new URL { ID = 1, DefaultURL = "http://example.com", ShourtedURL = "" };
            _context.URLs.Add(url);
            _context.SaveChanges();

            // Act
            var result = _urlService.Get(1);

            // Assert
            Assert.Equal(url, result);
        }

        [Fact]
        public void Post_CreatesNewURL()
        {
            // Arrange
            var newURL = new URL { DefaultURL = "http://newexample.com", ShourtedURL = "" };

            // Act
            var result = _urlService.Post(newURL);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("http://newexample.com", result.DefaultURL);
        }

        [Fact]
        public void Post_ReturnsNullForDuplicateURL()
        {
            // Arrange
            var existingURL = new URL { DefaultURL = "http://existing.com", ShourtedURL = "" };
            _context.URLs.Add(existingURL);
            _context.SaveChanges();
            var duplicateURL = new URL { DefaultURL = "http://existing.com", ShourtedURL = "" };

            // Act
            var result = _urlService.Post(duplicateURL);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void Put_UpdatesURL()
        {
            // Arrange
            var url = new URL { ID = 1, DefaultURL = "http://example.com", ShourtedURL = "" };
            _context.URLs.Add(url);
            _context.SaveChanges();
            url.DefaultURL = "http://updatedexample.com";

            // Act
            _urlService.Put(url);
            var updatedURL = _context.URLs.Find(1);

            // Assert
            Assert.Equal("http://updatedexample.com", updatedURL.DefaultURL);
        }

        [Fact]
        public void Delete_RemovesURL()
        {
            // Arrange
            var url = new URL { ID = 1, DefaultURL = "http://example.com", ShourtedURL = ""};
            _context.URLs.Add(url);
            _context.SaveChanges();

            // Act
            _urlService.Delete(1);
            var deletedURL = _context.URLs.Find(1);

            // Assert
            Assert.Null(deletedURL);
        }
    }
}
