using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input1 = "127.0.0.1";
            var input2 = "127,0,0,1";

            double value1;
            double value2;


            Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-be");
            Console.WriteLine("Current culture : {0}", Thread.CurrentThread.CurrentCulture.DisplayName);


            if (Double.TryParse(input1, out value1))
            {
                Console.WriteLine("{0} is a double : {1}", input1, Double.Parse(input1));
            }

            if (Double.TryParse(input2, out value2))
            {
                Console.WriteLine("{0} is a double : {1}", input2, Double.Parse(input2));
            }

            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-us");
            Console.WriteLine("Current culture : {0}", Thread.CurrentThread.CurrentCulture.DisplayName);


            if (Double.TryParse(input1, out value1))
            {
                Console.WriteLine("{0} is a double : {1}", input1, Double.Parse(input1));
            }

            if (Double.TryParse(input2, out value2))
            {
                Console.WriteLine("{0} is a double : {1}", input2, Double.Parse(input2));
            }

            Console.ReadKey();
        }
    }
}
