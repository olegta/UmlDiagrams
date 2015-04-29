﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain
{
    public interface IDiagramsRepository
    {
        IQueryable<Diagram> GetAllDiagrams();

        Diagram GetDiagram(int id);

        int? CreateNew(string diagramName, string author);
    }
}
