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

        public EfUnitOfWork UnitOfWork { get; private set; }


        internal GenericRepository(EfUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            Context = unitOfWork.Context;
        }


        public virtual IQueryable<T> GetAll()
        {
            return Context.Set<T>().AsQueryable();
        }

        public virtual T Get(Guid id)
        {
            return Context.Set<T>().Find(id);
        }

        public virtual void Update(T entity)
        {
            var existedEntity = Get(entity.Id);
            if (existedEntity == null)
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
