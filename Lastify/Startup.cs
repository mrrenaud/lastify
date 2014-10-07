using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Lastify.Startup))]
namespace Lastify
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

        }
    }
}
