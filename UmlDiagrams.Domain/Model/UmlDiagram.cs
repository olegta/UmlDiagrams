using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public class UmlDiagram
    {
        public const int DEFAULT_HEIGHT = 600;

        public const int DEFAULT_WIDTH = 800;


        public int Id { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime LastEditTime { get; set; }

        [Index(IsUnique = true)]
        [StringLength(200)]
        public string Name { get; set; }

        public ICollection<UmlDiagramElement> Elements { get; set; }

        public string Author { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }
    }
}
