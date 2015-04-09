using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UmlDiagrams.Domain;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private IDiagramsRepository _diagramsRepository;

        public HomeController(IDiagramsRepository diagramsRepository)
        {
            _diagramsRepository = diagramsRepository;
        }

        public ActionResult Index()
        {
            return View(new Diagram[]
            {
                new Diagram() { Name = "test1", CreateTime = DateTime.Now - TimeSpan.FromDays(1) },
                new Diagram() { Name = "test2", CreateTime = DateTime.Now - TimeSpan.FromDays(10) }
            });
        }

        public ActionResult Create()
        {
            return View();
        }
    }
}