using SearchIt.Models;
using System.Collections.Concurrent;
using System.Diagnostics;

namespace SearchIt.Services
{
    public class WordSearchService
    {
        public WordListService WordListService { get; }
        public WordSearchService(WordListService wordListService)
        {
            WordListService = wordListService;
        }

        private IEnumerable<String> Search(string SearchText)
        {
            var Words = WordListService.Words;
            var list = new ConcurrentBag<String>();
            Parallel.ForEach(Words, (String Word) =>
            {
                bool isMatching = false;
                for (int i = 0; i < Math.Min(SearchText.Length, Word.Length); i++)
                {
                    isMatching = Word[i] == SearchText[i];
                    if (!isMatching) break;
                }

                if (isMatching)
                    list.Add(Word);

            });
            return list.ToArray<String>();
        }

        public WordSearch GetSearchResult(string SearchText)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            IEnumerable<String> Result = Search(SearchText);
            watch.Stop();
            return new WordSearch(Result, watch.ElapsedMilliseconds);
        }
    }
}
