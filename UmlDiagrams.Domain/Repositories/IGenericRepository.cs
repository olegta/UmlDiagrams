using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain.Repositories
{
    public interface IGenericRepository<T> where T : IDbEntity
    {
        IQueryable<T> GetAll();

        T Get(int id);

        void Update(T entity);

        void Delete(T entity);
    }

    public static class IGenericRepositoryExtensions
    {
        public static void Delete<T>(this IGenericRepository<T> repository, int id) where T : IDbEntity
        {
            repository.Delete(repository.Get(id));
        }
    }
}
