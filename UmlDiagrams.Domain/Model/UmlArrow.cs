using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public class UmlArrow : IDbEntity
    {
        public int Id { get; set; }

        public UmlDiagramElement First { get; set; }

        public UmlDiagramElement Second { get; set; }

        public string Label { get; set; }

        public UmlArrowType ArrowType { get; set; }
    }
}
