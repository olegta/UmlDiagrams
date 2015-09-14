using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using UmlDiagrams.WebApp.Infrastructure;

[assembly: OwinStartup(typeof(UmlDiagrams.WebApp.Startup))]

namespace UmlDiagrams.WebApp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var configuration = new HubConfiguration();
            configuration.EnableDetailedErrors = true;
            configuration.Resolver = new SignalRDependencyResolver();
            app.MapSignalR(configuration);
        }
    }
}
