using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public class UmlOperation : IDbEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}
