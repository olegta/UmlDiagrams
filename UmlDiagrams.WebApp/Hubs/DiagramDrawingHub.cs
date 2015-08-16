using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using NLog;

namespace UmlDiagrams.WebApp.Hubs
{
    public class DiagramDrawingHub : Hub
    {
        private readonly Logger _log = LogManager.GetCurrentClassLogger();

        public void ResizeDiagram(int width, int height)
        {
            Clients.Others.resizeDiagram();
        }

        public void RenameDiagram(string newName)
        {
            _log.Debug("renaming with " + newName);
            Clients.All.addDiagram();
        }

        public void AddElement(string wrappedElement)
        {
            Clients.Others.addElement();
        }
    }
}