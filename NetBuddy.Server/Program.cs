using System.Text;
using Marten;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetBuddy.Server.Data;
using NetBuddy.Server.Interfaces.Authentication;
using NetBuddy.Server.Models.User;
using NetBuddy.Server.Services.Authentication;
using Serilog;
using Serilog.Events;
using Weasel.Core;

// initialize startup logger
string logPath = Path.Combine(Directory.GetCurrentDirectory(), "logs");
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File(Path.Combine(logPath, "nb_server_startup_.log"), rollingInterval: RollingInterval.Day)
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(args);

// add the logger to the builder
builder.Logging.ClearProviders();
builder.Host.UseSerilog((context, services, configuration) => configuration
#if DEBUG
    .MinimumLevel.Information()
#else
    .MinimumLevel.Warning()
#endif
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File(Path.Combine(logPath, "nb_server_log_.log"), rollingInterval: RollingInterval.Month));

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

// add the token service
builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

// add serilog http request logging
app.UseSerilogRequestLogging();

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
