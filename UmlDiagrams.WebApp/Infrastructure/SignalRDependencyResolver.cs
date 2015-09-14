using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Ninject;
using UmlDiagrams.Domain;
using UmlDiagrams.Domain.Repositories;
using UmlDiagrams.WebApp.Hubs;

namespace UmlDiagrams.WebApp.Infrastructure
{
    public class SignalRDependencyResolver : DefaultDependencyResolver
    {
        private readonly IKernel _kernel = new StandardKernel();


        public SignalRDependencyResolver()
        {
            _kernel.Bind<IUnitOfWork>().To<EfUnitOfWork>();
            _kernel.Bind(typeof(IHubConnectionContext<dynamic>))
                .ToMethod(context => this.Resolve<IConnectionManager>().GetHubContext<DiagramDrawingHub>().Clients)
                .WhenInjectedInto<IUnitOfWork>();
        }


        public override object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType) ?? base.GetService(serviceType);
        }

        public override IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType).Concat(base.GetServices(serviceType));
        }
    }
}