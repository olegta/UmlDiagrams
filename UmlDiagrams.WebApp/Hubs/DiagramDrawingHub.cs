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

        public void AddElement(Guid id, UmlDiagramElement element)
        {
            _log.Debug(String.Format("create element {0} on diagram {1}", element.Id, id));
            _unitOfWork.GetDiagramRepository().AddElement(id, element);
            Clients.OthersInGroup(GetGroupName(id)).addElement(element);
        }
    }
}