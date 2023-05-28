using System.Text.Json;

namespace SearchIt.Models
{
    public class WordSearch
    {
        public long SearchDurationInMilliseconds { get; }
        public IEnumerable<String> Words { get; }
        public WordSearch(IEnumerable<string> words, long searchDurationInMilliseconds)
        {
            Words = words;
            SearchDurationInMilliseconds = searchDurationInMilliseconds;
        }
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
