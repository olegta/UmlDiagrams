using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public abstract class UmlDiagramElement : IDbEntity
    {
        public int Id { get; set; }

        public int XPosition { get; set; }

        public int YPosition { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }
    }
}
