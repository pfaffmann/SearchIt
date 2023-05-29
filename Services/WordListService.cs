using SearchIt.Models;

namespace SearchIt.Services
{
    public class WordListService
    {
        public IEnumerable<String> Words { get; }
        public WordListService()
        {
            Words = new WordList().Words;
        }
        /// <summary>
        /// Returns an unsorted String Array created by the WordList constructor containing four lettered words from AAAA-ZZZZ.
        /// </summary>
        public IEnumerable<String> GetAllWords()
        {
            return Words;
        }
    }
}
