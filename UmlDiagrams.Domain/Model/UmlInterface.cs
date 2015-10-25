using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain.Model
{
    [Table("UmlInterfaces")]
    public class UmlInterface : UmlDiagramElement
    {
        public ICollection<UmlOperation> Operations { get; set; }
    }
}
