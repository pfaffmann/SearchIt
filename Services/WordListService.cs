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

        public IEnumerable<String> GetAllWords()
        {
            return Words;
        }

        public IEnumerable<String> GetAllWordsSorted()
        {
            return Words.AsParallel().OrderBy(w => w).ToArray();
        }
    }
}
