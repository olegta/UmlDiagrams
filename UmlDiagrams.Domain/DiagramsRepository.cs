using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain
{
    public class DiagramsRepository : IDiagramsRepository
    {
        private UmlDiagramContext _diagramsContext = new UmlDiagramContext();


        public IQueryable<Model.Diagram> GetDiagrams()
        {
            return _diagramsContext.Diagrams;
        }
    }
}
