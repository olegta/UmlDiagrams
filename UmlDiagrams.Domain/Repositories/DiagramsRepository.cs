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
    public class DiagramsRepository : IDiagramsRepository
    {
        private static Logger log = LogManager.GetCurrentClassLogger();


        private UmlDiagramContext _diagramsContext = new UmlDiagramContext();


        public IQueryable<UmlDiagram> GetAllDiagrams()
        {
            return _diagramsContext.Diagrams;
        }

        public UmlDiagram GetDiagram(int id) // TODO: обработка ситуации с несуществующем Id
        {
            return _diagramsContext.Diagrams.First(i => i.Id == id);
        }

        public int? CreateNew(string diagramName, string author)
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
                    Name = diagramName,
                    Author = author,
                };
                diagram.CreateTime = diagram.LastEditTime = DateTime.Now;
                _diagramsContext.Diagrams.Add(diagram);
                _diagramsContext.SaveChanges();
                return diagram.Id;
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
    }
}
