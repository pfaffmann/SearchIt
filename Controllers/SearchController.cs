using Microsoft.AspNetCore.Mvc;
using SearchIt.Models;
using SearchIt.Services;

namespace SearchIt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        public WordSearchService WordSearchService { get; }

        public SearchController(WordSearchService wordSearchService)
        {
            WordSearchService = wordSearchService;
        }

        [HttpGet("{SearchText}")]
        public IActionResult Get(String SearchText)
        {
            return Ok(WordSearchService.GetSearchResult(SearchText));
        }
    }
}
