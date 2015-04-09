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
            : base("DbConnection")
        {
            Database.SetInitializer(new DropCreateDatabaseAlways<UmlDiagramContext>());
        }

        public DbSet<Diagram> Diagrams { get; set; }

        public DbSet<UserAction> UserActions { get; set; }

        public DbSet<ActorElement> ActorElements { get; set; }

        public DbSet<UseCaseElement> UseCaseElements { get; set; }

        public DbSet<ArrowElement> ArrowElements { get; set; }
    }
}
