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
        /// <summary>
        /// This API Endpoint takes a searchText as a string from the URL scheme "{baseURL}/wordsearch/searchtext".
        /// Searches in an unsorted List created by the WordList constructor for a substring at the beginning of each word in the list.
        /// and returns a WordSearch instance with the matching Words and the ellapsed time during the search in milliseconds.
        /// If the resulting Words Array is empty then a Status Code 206 gets send. If there are matching words then 200 is send.
        /// </summary>
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
