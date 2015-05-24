using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace UmlDiagrams.WebApp.Hubs
{
    public class DiagramDrawingHub : Hub
    {
        public void ResizeDiagram(int width, int height)
        {
            Clients.Others.resizeDiagram();
        }

        public void RenameDiagram(string newName)
        {
            Clients.Others.addDiagram();
        }

        public void AddElement(string wrappedElement)
        {
            Clients.Others.addElement();
        }
    }
}