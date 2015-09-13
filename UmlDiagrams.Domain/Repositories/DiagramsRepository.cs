using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NLog;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain.Repositories
{
    public class DiagramsRepository : IDiagramsRepository, IDisposable
    {
        private static Logger log = LogManager.GetCurrentClassLogger();


        private UmlDiagramContext _diagramsContext = new UmlDiagramContext();


        public IQueryable<UmlDiagram> GetAllDiagrams()
        {
            return _diagramsContext.Diagrams;
        }

        public UmlDiagram GetDiagram(Guid id)
        {
            return _diagramsContext.Diagrams.FirstOrDefault(i => i.Id == id);
        }

        public UmlDiagram CreateNew(string diagramName, string author)
        {
            if (diagramName == null)
                throw new ArgumentException("argument can not be null", "diagramName");
            if (author == null)
                throw new ArgumentException("argument can not be null", "author");

            // проверка уникальности имени таблицы осуществляется базой данных (unique поле)
            try
            {
                var diagram = new UmlDiagram()
                {
                    Id = Guid.NewGuid(),
                    Name = diagramName,
                    Author = author
                };
                diagram.CreateTime = diagram.LastEditTime = DateTime.Now;
                _diagramsContext.Diagrams.Add(diagram);
                _diagramsContext.SaveChanges();
                return diagram;
            }
            catch (SqlException exception)
            {
                log.ErrorException("cannot create new diagram", exception);
                return null;
            }
            catch (DbUpdateException exception)
            {
                log.ErrorException("cannot create new diagram", exception);
                return null;
            }
        }

        ~DiagramsRepository()
        {
            _diagramsContext.Dispose();
        }

        public void Dispose()
        {
            _diagramsContext.Dispose();
        }


        public UmlDiagram GetDiagram(string name)
        {
            return _diagramsContext.Diagrams.SingleOrDefault(i => i.Name == name);
        }
    }
}
