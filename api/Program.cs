using api;
using System.Data.SqlClient;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/testdb", () =>
{
    bool isConnected = Database.TestConnection();

    if (isConnected)
    {
        return "La conexión a la base de datos es exitosa.";
    }
    else
    {
        return "No se pudo conectar a la base de datos.";
    }
});




   
app.MapPost("/register", async (HomeDb db, User user) =>
{
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Created($"/user/{user.Name}", user);
});


app.Run();
