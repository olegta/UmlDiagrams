using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;
using UmlDiagrams.Domain.Repositories;

namespace UmlDiagrams.Domain
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> GenericRepository<T>() where T : class, IDbEntity;

        IDiagramsRepository GetDiagramRepository();

        void Commit();
    }
}
