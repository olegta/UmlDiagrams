using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;
using UmlDiagrams.Domain;
using UmlDiagrams.Domain.Model;
using UmlDiagrams.WebApp.Hubs;

namespace UmlDiagrams.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public const string DIAGRAM_NOT_CREATED_KEY = "NotCreated";

        public const string AUTHOR_COOKIE = "default_author";


        private IDiagramsRepository _diagramsRepository;

        public HomeController(IDiagramsRepository diagramsRepository)
        {            
            _diagramsRepository = diagramsRepository;
        }

        public ViewResult Index()
        {
            // TODO: ограничить количество одновременно отображаемых на странице диаграмм
            IQueryable<UmlDiagram> allDiagrams = _diagramsRepository.GetAllDiagrams();
            return View(allDiagrams);
        }

        [HttpPost]
        public RedirectToRouteResult Create(string diagramName, string author)
        {
            int? createdId = _diagramsRepository.CreateNew(diagramName, author);
            if (createdId != null)
            {
                Response.SetCookie(new HttpCookie(AUTHOR_COOKIE, author));
                return RedirectToRoute(new {controller = "Home", action = "Diagram", id = createdId.Value});
            }
            TempData[DIAGRAM_NOT_CREATED_KEY] = "Не удалось создать новую диаграмму. Попробуйте использовать другое имя.";
            
            return RedirectToRoute(new { controller = "Home", action = "Index" });
        }

        public ViewResult Diagram(int id)
        {
            return View(_diagramsRepository.GetDiagram(id));
        }
    }
}