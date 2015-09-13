using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;
using UmlDiagrams.Domain.Repositories;

namespace UmlDiagrams.Domain
{
    public class EfUnitOfWork : IUnitOfWork
    {
        internal UmlDiagramContext Context { get; private set; }

        
        public EfUnitOfWork()
        {
            Context = new UmlDiagramContext();
        }


        public IGenericRepository<T> GenericRepository<T>() where T : class, IDbEntity
        {
            return new GenericRepository<T>(this);
        }

        public IDiagramsRepository GetDiagramRepository()
        {
            return new DiagramsRepository();
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
