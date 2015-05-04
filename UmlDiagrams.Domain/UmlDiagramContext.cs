using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UmlDiagrams.Domain.Model;

namespace UmlDiagrams.Domain
{
    class UmlDiagramContext : DbContext
    {
        public UmlDiagramContext()
            : base("UmlDiagramsContext")
        {
            Database.SetInitializer(
                //new DropCreateDatabaseAlways<UmlDiagramContext>()
                new CreateDatabaseIfNotExists<UmlDiagramContext>()
                );
        }

        public DbSet<UmlDiagram> Diagrams { get; set; }

        public DbSet<UmlArrow> Arrows { get; set; }

        public DbSet<UmlComment> Comments { get; set; }

        public DbSet<UmlAttribute> Attributes { get; set; }

        public DbSet<UmlOperation> Operations { get; set; }

        public DbSet<UmlDiagramElement> DiagramElements { get; set; }

        public DbSet<UmlClass> Classes { get; set; }

        public DbSet<UmlInterface> Interfaces { get; set; }

        public DbSet<UmlEnumeration> Enumerations { get; set; }

        public DbSet<UmlLiteral> Literals { get; set; }
    }
}
