using Microsoft.AspNetCore.Mvc;
using SearchIt.Models;
using SearchIt.Services;

namespace SearchIt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WordSearchController : ControllerBase
    {
        public WordSearchService WordSearchService { get; }

        public WordSearchController(WordSearchService wordSearchService)
        {
            WordSearchService = wordSearchService;
        }

        [HttpGet("{SearchText}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(WordSearch))]
        [ProducesResponseType(StatusCodes.Status206PartialContent, Type = typeof(WordSearch))]
        public IActionResult Get(String SearchText)
        {
            WordSearch wordSearch = WordSearchService.GetSearchResult(SearchText);
            return wordSearch.Words.Any() ? Ok(wordSearch) : StatusCode(206,wordSearch); //Any is faster than Count > 0
        }
    }
}
