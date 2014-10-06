using System.Web;
using System.Web.Optimization;

namespace Lastify
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/loading-bar.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular/controller").Include(
                        "~/scripts/app/angular/controller.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/content/stylesheets").Include(
                      "~/Content/css/vendor/bootstrap.css",
                      "~/Content/css/vendor/loading-bar.css",
                      "~/Content/css/style.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/scripts/app/main.js"));

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
