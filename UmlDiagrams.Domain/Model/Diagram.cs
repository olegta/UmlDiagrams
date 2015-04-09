using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public class Diagram
    {
        public int Id { get; set; }

        public DateTime CreateTime { get; set; }

        public string Name { get; set; }

        public IEnumerable<UserAction> Actions { get; set; }

        public string Author { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }
    }
}
