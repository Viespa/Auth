using System;
using System.Data.SqlClient;
using DotNetEnv;

namespace api
{
    public class Database
    {
        public static string ConnectionString { get; private set; }

        static Database()
        {
            Env.Load();
            string ConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
        }

        public static SqlConnection GetConnection()
        {
            SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));
            connection.Open();
            return connection;
        }

        public static bool TestConnection()
        {
            SqlConnection connection = null;
            try
            {
                Env.Load();
                connection = new SqlConnection(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"));
                connection.Open();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error de conexión: " + ex.Message);
                return false;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
        }
    }
}
