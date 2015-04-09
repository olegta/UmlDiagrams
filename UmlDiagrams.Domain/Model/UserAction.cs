using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public enum UserActionType
    {
        Update,
        Delete
    }

    public class UserAction
    {
        public int Id { get; set; }

        public UserActionType Type { get; set; }

        public DiagramElement Element { get; set; }
    }
}
