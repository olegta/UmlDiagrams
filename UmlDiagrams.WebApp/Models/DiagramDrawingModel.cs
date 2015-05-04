using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.WebApp.Models
{
    public class DiagramDrawingModel
    {
        public UmlDiagram Diagram { get; set; }

        public IEnumerable<ToolboxElement> ToolboxElements { get; set; }
    }
}