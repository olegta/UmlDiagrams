using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain
{
    public class UnitOfWork : IUnitOfWork
    {
        internal UmlDiagramContext Context { get; private set; }

        
        public UnitOfWork()
        {
            Context = new UmlDiagramContext();
        }

        public void Commit()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
