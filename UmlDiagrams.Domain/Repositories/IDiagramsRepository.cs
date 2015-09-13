using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain.Repositories
{
    public interface IDiagramsRepository
    {
        IQueryable<UmlDiagram> GetAllDiagrams();

        UmlDiagram GetDiagram(Guid id);

        UmlDiagram GetDiagram(string name);

        UmlDiagram CreateNew(string diagramName, string author);
    }
}
