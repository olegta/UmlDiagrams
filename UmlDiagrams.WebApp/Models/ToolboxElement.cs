using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmlDiagrams.WebApp.Models
{
    public class ToolboxElement
    {
        public ToolboxElement(string cssIconClass, string caption, string documentId)
        {
            this.CssIconClass = cssIconClass;
            this.Caption = caption;
            this.DocumentId = documentId;
        }

        public string CssIconClass { get; set; }

        public string Caption { get; set; }

        public string DocumentId { get; set; }
    }
}