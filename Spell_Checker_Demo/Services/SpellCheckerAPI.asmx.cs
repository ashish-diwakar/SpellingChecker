using SpellChecker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace Spell_Checker_Demo.Services
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SpellCheckerAPI : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public string GetCorrectedText(string inputString)
        {
            string myObjectJson = "";
            using (var queuedSpellChecker = new QueuedSpellChecker())
            {
                var result = queuedSpellChecker.PerformSpellCheck(inputString, 0, new List<String>());

                var javaScriptSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                myObjectJson = javaScriptSerializer.Serialize(result);
            }

            return myObjectJson;
        }

    }
}
