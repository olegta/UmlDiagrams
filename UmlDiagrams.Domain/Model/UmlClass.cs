using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    [Table("UmlClasses")]
    public class UmlClass : UmlDiagramElement
    {
        public string Name { get; set; }

        public ICollection<UmlAttribute> Attributes { get; set; }

        public ICollection<UmlOperation> Operations { get; set; }
    }
}
