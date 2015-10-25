using System.Web;
using System.Web.Optimization;

namespace UmlDiagrams.WebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js",
                        "~/Scripts/jquery.ui-contextmenu.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/diagrams-interaction").Include(
                "~/Scripts/Home/diagrams-interaction.js"));

            bundles.Add(new ScriptBundle("~/bundles/DiagramDrawing").Include(
                        "~/Scripts/Home/DiagramDrawing/UmlElement.js",
                        "~/Scripts/Home/DiagramDrawing/Arrow.js",
                        "~/Scripts/Home/DiagramDrawing/UmlItemMember.js",
                        "~/Scripts/Home/DiagramDrawing/diagram-states.js",
                        "~/Scripts/Home/DiagramDrawing/Diagram.js",
                        "~/Scripts/Home/DiagramDrawing/initialization.js",
                        "~/Scripts/Home/DiagramDrawing/support-util.js",
                        "~/Scripts/Home/DiagramDrawing/signalr-client.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/Site").Include("~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/Drawing").Include(
                        "~/Content/icons.css",
                        "~/Content/uml-elements.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include("~/Content/bootstrap.css"));

            bundles.Add(new StyleBundle("~/Theme/redmond").Include("~/Theme/redmond/*.css"));
        }
    }
}
