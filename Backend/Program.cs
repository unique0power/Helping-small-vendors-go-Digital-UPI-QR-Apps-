using DigitalDukaan.API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Configure DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "SuperSecretKeyForDigitalDukaanAppThatIsAtLeast32BytesLong!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "DigitalDukaan API is running!");

// AUTHENTICATION ENDPOINTS
app.MapPost("/api/auth/register", async (AppDbContext db, IConfiguration config, RegisterDto request) =>
{
    if (await db.Users.AnyAsync(u => u.Phone == request.Mobile))
        return Results.BadRequest("User with this mobile number already exists.");

    var user = new User
    {
        Name = request.FullName,
        Phone = request.Mobile,
        Email = request.Email ?? "",
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
        Role = "Vendor"
    };
    db.Users.Add(user);
    await db.SaveChangesAsync();

    var business = new Business
    {
        UserId = user.Id,
        BusinessName = request.BusinessName,
        DigitalScore = 30
    };
    db.Businesses.Add(business);
    await db.SaveChangesAsync();

    return Results.Ok(new { message = "Registration successful" });
});

app.MapPost("/api/auth/login", async (AppDbContext db, IConfiguration config, LoginDto request) =>
{
    var user = await db.Users.Include(u => u.Businesses).FirstOrDefaultAsync(u => u.Phone == request.Mobile);
    if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        return Results.BadRequest("Invalid mobile number or password.");

    var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(config["Jwt:Key"]!);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new System.Security.Claims.ClaimsIdentity(new[]
        {
            new System.Security.Claims.Claim("id", user.Id.ToString()),
            new System.Security.Claims.Claim("role", user.Role),
            new System.Security.Claims.Claim("businessId", user.Businesses.FirstOrDefault()?.Id.ToString() ?? "")
        }),
        Expires = DateTime.UtcNow.AddDays(7),
        Issuer = config["Jwt:Issuer"],
        Audience = config["Jwt:Audience"],
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);

    return Results.Ok(new
    {
        token = tokenHandler.WriteToken(token),
        user = new { id = user.Id, name = user.Name, role = user.Role, businessName = user.Businesses.FirstOrDefault()?.BusinessName }
    });
});

// PRODUCTS ENDPOINTS
app.MapGet("/api/products", async (AppDbContext db) =>
{
    return await db.Products.ToListAsync();
}); // In a real app, filter by BusinessId using the authenticated user's claims

app.MapPost("/api/products", async (AppDbContext db, ProductDto request) =>
{
    var product = new Product
    {
        BusinessId = 1, // Mock business ID for simplicity
        Name = request.Name,
        Price = request.Price,
        Category = request.Category,
        Description = request.Description ?? ""
    };
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/api/products/{product.Id}", product);
});

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // Creates the DB if it doesn't exist
}

app.Run();

// DTOs
public record RegisterDto(string FullName, string BusinessName, string Mobile, string Email, string Password);
public record LoginDto(string Mobile, string Password);
public record ProductDto(string Name, decimal Price, string Category, string? Description);
