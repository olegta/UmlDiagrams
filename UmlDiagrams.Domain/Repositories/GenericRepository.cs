using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T>, IDisposable where T : class, IDbEntity
    {
        internal UmlDiagramContext Context { get; private set; }

        public UnitOfWork UnitOfWork { get; private set; }

        public GenericRepository(UnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            Context = unitOfWork.Context;
        }

        public virtual IQueryable<T> GetAll()
        {
            return Context.Set<T>().AsQueryable();
        }

        public virtual T Get(int id)
        {
            return Context.Set<T>().Find(id);
        }

        public virtual void Update(T entity)
        {
            if (entity.Id == 0)
            {
                Context.Set<T>().Add(entity);
            }
            else
            {
                Context.Set<T>().Attach(entity);
                Context.Entry(entity).State = EntityState.Modified;
            }
        }

        public virtual void Delete(T entity)
        {
            Context.Set<T>().Remove(entity);
        }

        public void Dispose()
        {
            UnitOfWork.Dispose();
        }
    }
}
