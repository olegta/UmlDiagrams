using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Ninject;
using UmlDiagrams.Domain;
using UmlDiagrams.Domain.Repositories;

namespace UmlDiagrams.WebApp.Infrastructure
{
    public class UmlDiagramsControllerFactory : DefaultControllerFactory
    {
        private IKernel _kernel;

        public UmlDiagramsControllerFactory()
        {
            _kernel = new StandardKernel();
            _kernel.Bind<IDiagramsRepository>().To<DiagramsRepository>();
        }
        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            return controllerType == null ? null : (IController) _kernel.Get(controllerType);
        }
    }
}