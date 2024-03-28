using Marten;
using NetBuddy.Server.Interfaces;
using NetBuddy.Server.Models;
using NetBuddy.Server.Services;
using NetBuddy.Server.test;
using Weasel.Core;

var builder = WebApplication.CreateBuilder(args);

// add the secret configuration to the builder
builder.Configuration.AddJsonFile("appsettings.secret.json", false);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configure the Marten document store
var connectionString = builder.Configuration.GetConnectionString("postgres");
builder.Services.AddMarten(options =>
{
    // define the connection string to the underlying postgresql database
    options.Connection(connectionString!);
    // define the index for the user model
    options.Schema.For<User>().Index(user => user.Email);
    // automatically create the schema if it doesn't exist
    options.AutoCreateSchemaObjects = AutoCreate.All;
}).UseLightweightSessions();

// pre-populate the database with some test data
#if DEBUG
builder.Services.InitializeMartenWith<TestingData>();
#endif

// add the password hashing service to the context
builder.Services.AddScoped<IPasswordService, BCryptPasswordService>();

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

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
