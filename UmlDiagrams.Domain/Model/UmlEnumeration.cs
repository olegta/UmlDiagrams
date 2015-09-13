using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    [Table("UmlEnumerations")]
    public class UmlEnumeration : UmlDiagramElement
    {
        public string Name { get; set; }

        public ICollection<UmlLiteral> Literals { get; set; }
    }
}
