using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NLog;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain
{
    public class DiagramsRepository : IDiagramsRepository
    {
        private static Logger log = LogManager.GetCurrentClassLogger();


        private UmlDiagramContext _diagramsContext = new UmlDiagramContext();


        public IQueryable<Diagram> GetAllDiagrams()
        {
            return _diagramsContext.Diagrams;
        }

        public Diagram GetDiagram(int id)
        {
            return _diagramsContext.Diagrams.First(i => i.Id == id);
        }

        public int? CreateNew(string diagramName, string author)
        {
            if (diagramName == null)
                throw new ArgumentException("argument can not be null", "diagramName");
            if (author == null)
                throw new ArgumentException("argument can not be null", "author");

            try
            {
                var diagram = new Diagram()
                {
                    Name = diagramName,
                    Author = author,
                    Height = Diagram.DEFAULT_HEIGHT,
                    Width = Diagram.DEFAULT_WIDTH,
                    Actions = new List<UserAction>()
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
