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
using UmlDiagrams.WebApp.Models;
using UmlDiagrams.Domain.Repositories;

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
            UmlDiagram diagram = _diagramsRepository.GetDiagram(id);
            var toolboxItems = new List<ToolboxElement>()
            {
                new ToolboxElement("icon-pointer", "Указатель", "pointer-tool"),
                new ToolboxElement("icon-class", "Класс", "uml-class-tool"),
                new ToolboxElement("icon-interface", "Интерфейс", "uml-interface-tool"),
                new ToolboxElement("icon-enumeration", "Перечисление", "uml-enumeration-tool"),
                new ToolboxElement("icon-comment", "Комментарий", "uml-comment-tool"),
                new ToolboxElement("icon-association", "Ассоциация", "arrow-association-tool"),
                new ToolboxElement("icon-aggregation", "Агрегирование", "arrow-aggregation-tool"),
                new ToolboxElement("icon-composition", "Композиция", "arrow-composition-tool"),
                new ToolboxElement("icon-dependency", "Зависимость", "arrow-dependency-tool"),
                new ToolboxElement("icon-inheritance", "Наследование", "arrow-inheritance-tool"),
                new ToolboxElement("icon-connector", "Связь", "arrow-connector-tool"),
            };
            return View(new DiagramDrawingModel()
            {
                Diagram = diagram,
                ToolboxElements = toolboxItems
            });
        }
    }
}