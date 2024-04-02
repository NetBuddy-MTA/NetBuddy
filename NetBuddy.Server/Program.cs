using System.Text;
using Marten;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetBuddy.Server.Data;
using NetBuddy.Server.Models.User;
using Weasel.Core;

var builder = WebApplication.CreateBuilder(args);

// add the secret configuration to the builder
builder.Configuration.AddJsonFile("appsettings.secret.json", false);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configure the identity database context
var identityConnectionString = builder.Configuration.GetConnectionString("nb_identity");
builder.Services.AddDbContext<IdentityDbContext>(options => options.UseNpgsql(identityConnectionString));

// configure the Marten document store
#if DEBUG
var connectionString = builder.Configuration.GetConnectionString("nb_dev");
#else
var connectionString = builder.Configuration.GetConnectionString("nb_prod");
#endif
builder.Services.AddMarten(options =>
{
    // define the connection string to the underlying postgresql database
    options.Connection(connectionString!);
    // automatically create the schema if it doesn't exist
    options.AutoCreateSchemaObjects = AutoCreate.All;
}).UseLightweightSessions();

// configure the identity service
builder.Services.AddIdentity<UserAccount, IdentityRole>()
    .AddEntityFrameworkStores<IdentityDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
                options.DefaultScheme =
                    options.DefaultSignInScheme =
                        options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!))
    };
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
