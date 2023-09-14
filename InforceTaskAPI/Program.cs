using DB.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Services.Repository;
using Services.Services;

//Application init
var builder = WebApplication.CreateBuilder(args);

//Setup DB
string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(connection));


//setup MVC
builder.Services.AddControllersWithViews();

//Implement DI
builder.Services.AddScoped<IUserRepository, UserService>();
builder.Services.AddScoped<IURLRepository, URLService>();


//Setup CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});


//running App
var app = builder.Build();


app.UseAuthentication();
app.UseAuthorization();

app.UseCors();


if (!app.Environment.IsDevelopment())
{
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