﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UmlDiagrams.Domain.Model
{
    public class UmlLiteral : IDbEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
         
        public string Value { get; set; }

        public string Description { get; set; }  
    }
}
