using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace CardLab.Controllers
{
    [Produces("application/json")]
    public class StaticController : Controller
    {
        private readonly IHostingEnvironment _appEnvironment;

        public StaticController(IHostingEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }

        [Route("images/{id}")]
        public ActionResult GetIndex(string id)
        {
            var filePath = Path.Combine(_appEnvironment.WebRootPath
                        , Path.Combine($"images/{id}.jpg"));

            FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fs, "image/jpeg");
        }

        [Route("cards/{id}")]
        public JsonResult GetCard(string id)
        {
            return new JsonResult(new { name = "name", description = "description" });
        }
    }
}