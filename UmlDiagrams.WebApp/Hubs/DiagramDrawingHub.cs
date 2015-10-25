using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using NLog;
using UmlDiagrams.Domain;
using UmlDiagrams.Domain.Model;
using UmlDiagrams.Domain.Repositories;

namespace UmlDiagrams.WebApp.Hubs
{
    public class DiagramDrawingHub : Hub
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();

        private const string DrawingGroupPrefix = "DiagramDrawing_";


        private readonly IUnitOfWork _unitOfWork;


        public DiagramDrawingHub(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        private string GetGroupName(Guid id)
        {
            return DrawingGroupPrefix + id.ToString();
        }


        public void JoinDiagramEdditing(Guid diagramId)
        {
            string groupName = GetGroupName(diagramId);
            _log.Debug(String.Format("User with connection id: {0} join to group {1}", Context.ConnectionId, groupName));
            Groups.Add(Context.ConnectionId, groupName);
            UmlDiagram diagram = _unitOfWork.GetDiagramRepository().GetDiagram(diagramId);
            Clients.Caller.initializeDiagram(diagram);
        }

        public void ResizeDiagram(Guid diagramId, int width, int height)
        {
            if (width <= 0 || height <= 0)
                throw new ArgumentException("invalid diagram size");
            _log.Debug(String.Format("resize diagram {0}", diagramId));
            var diagramsRepository = _unitOfWork.GetDiagramRepository();
            UmlDiagram diagram = diagramsRepository.GetDiagram(diagramId);
            diagram.Width = width;
            diagram.Height = height;
            diagramsRepository.UpdateDiagram(diagram);
            Clients.All.resizeDiagram(diagram);
        }

        public void RenameDiagram(string id, string newName)
        {
            Guid diagramId = new Guid(id);
            if (String.IsNullOrEmpty(newName))
                throw new ArgumentException("empty new name");
            _log.Debug(String.Format("renaming diagram {0} with {1}", diagramId, newName));
            var diagramsRepository = _unitOfWork.GetDiagramRepository();
            UmlDiagram diagram = diagramsRepository.GetDiagram(diagramId);
            diagram.Name = newName;
            diagramsRepository.UpdateDiagram(diagram);
            Clients.OthersInGroup(GetGroupName(diagram.Id)).renameDiagram(diagram);
        }

        public void AddClass(Guid id, UmlClass element)
        {
            SaveCreatedElement(id, element);
            Clients.OthersInGroup(GetGroupName(id)).addClass(element);
        }        

        public void AddInterface(Guid id, UmlInterface element)
        {
            SaveCreatedElement(id, element);
            Clients.OthersInGroup(GetGroupName(id)).addInterface(element);
        }

        public void AddEnum(Guid id, UmlEnumeration element)
        {
            SaveCreatedElement(id, element);
            Clients.OthersInGroup(GetGroupName(id)).addEnum(element);
        }

        public void AddComment(Guid id, UmlComment element)
        {
            SaveCreatedElement(id, element);
            Clients.OthersInGroup(GetGroupName(id)).addComment(element);
        }

        public void MoveElement(Guid id, Guid elementId, int top, int left, int width, int height)
        {
            _log.Debug(String.Format("change position of element {0} on diagram {1} to ({2}; {3}) width: {4}; height: {5}",
                elementId, id, top, left, width, height));
            var umlElementsRepository = _unitOfWork.GenericRepository<UmlDiagramElement>();
            UmlDiagramElement element = umlElementsRepository.Get(elementId);
            element.XPosition = left;
            element.YPosition = top;
            element.Height = height;
            element.Width = width;
            umlElementsRepository.Update(element);
            _unitOfWork.Commit();
            element.Diagram = null;
            Clients.OthersInGroup(GetGroupName(id)).moveElement(element);
        }

        public void RenameElement(Guid id, Guid elementId, string newName)
        {
            _log.Debug(String.Format("rename element {0} on diagram {1} to {2}", elementId, id, newName));
            var umlElementsRepository = _unitOfWork.GenericRepository<UmlDiagramElement>();
            UmlDiagramElement element = umlElementsRepository.Get(elementId);
            element.Text = newName;
            umlElementsRepository.Update(element);
            _unitOfWork.Commit();
            element.Diagram = null;
            Clients.OthersInGroup(GetGroupName(id)).renameElement(element);
        }

        public void AddArrow(Guid id, Guid arrowId, Guid firstElementId, Guid secondElementId)
        {
            _log.Debug(String.Format("add arrow on diagram {0}. connecting elements: {1} {2}",
                id, firstElementId, secondElementId));
            var umlElementsRepository = _unitOfWork.GenericRepository<UmlDiagramElement>();
            var first = umlElementsRepository.Get(firstElementId);
            var second = umlElementsRepository.Get(secondElementId);
            var arrowsRepository = _unitOfWork.GenericRepository<UmlArrow>();
            UmlArrow newArrow = new UmlArrow() { Id = arrowId, First = first, Second = second };
            arrowsRepository.Update(newArrow);
            _unitOfWork.Commit();
            newArrow.First.Diagram = null;
            newArrow.Second.Diagram = null;
            Clients.OthersInGroup(GetGroupName(id)).addArrow(newArrow);
        }

        public void DeleteElement(Guid id, Guid elementId)
        {
            // todo: delete from db
            Clients.OthersInGroup(GetGroupName(id)).deleteElement(elementId);
        }

        public void AddAttribute(Guid id, Guid elementId, Guid attributeId)
        {
            // todo: delete from db
            Clients.OthersInGroup(GetGroupName(id)).addAttribute(elementId, attributeId);
        }

        public void RenameAttribute(Guid id, Guid elementId, Guid attributeId, string newName)
        {
            // todo: delete from db
            Clients.OthersInGroup(GetGroupName(id)).addAttribute(elementId, attributeId, newName);
        }
        private void SaveCreatedElement(Guid id, UmlDiagramElement element)
        {
            _log.Debug(String.Format("create element {0} on diagram {1}", element.Id, id));
            _unitOfWork.GetDiagramRepository().AddElement(id, element);
            _unitOfWork.Commit();
            element.Diagram = null; // иначе будет эксепшн при преобразовании в json
        }
    }
}