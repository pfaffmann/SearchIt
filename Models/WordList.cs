namespace SearchIt.Models
{
    public class WordList
    {
        public IEnumerable<String> Words { get; }

        public WordList() //Constructor - create unsorted list of four letter words
        {
            String[] list = new String[26 * 26 * 26 * 26]; // AAAA-ZZZZ
            int index = 0;
            // Generate a sorted List from AAAA-ZZZZ
            for (char c1 = 'A'; c1 <= 'Z'; c1++)
            {
                for (char c2 = 'A'; c2 <= 'Z'; c2++)
                {
                    for (char c3 = 'A'; c3 <= 'Z'; c3++)
                    {
                        for (char c4 = 'A'; c4 <= 'Z'; c4++)
                        {
                            list[index] = $"{c1}{c2}{c3}{c4}";
                            index += 1;
                        }
                    }
                }
            }
            // Shuffle the list with the Fisher Yates Shuffle
            for (int i = list.Length - 1; i > 0; i -= 1)
            {
                int randomInteger = Random.Shared.Next(0, i + 1); // Max is excluded
                // exchange list[i] and list[randomInteger]
                String tmp = list[randomInteger];
                list[randomInteger] = list[i];
                list[i] = tmp;
            }

            Words = list;
        }
    }
}
