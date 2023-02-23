using DB.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.Repository;
using Services.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connection = builder.Configuration.GetConnectionString("DefaultConnection");
// добавляем контекст ApplicationContext в качестве сервиса в приложение
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(connection));

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IUserRepository, UserService>();
builder.Services.AddScoped<IURLRepository, URLService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {

            //you can configure your custom policy
            builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});


var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
