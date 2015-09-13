using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public interface IDbEntity
    {
        Guid Id { get; set; }
    }
}
