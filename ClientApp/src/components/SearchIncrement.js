import React, { useState } from "react";

const initialMetaData = {
  isLoading: false,
  isError: false,
  errorMsg: "",
  duration: 0,
};

const asyncFilter = async (arr, predicate) =>
  arr.reduce(
    async (memo, e) => ((await predicate(e)) ? [...(await memo), e] : memo),
    []
  );

const SearchIncrement = () => {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState();
  const [meta, setMeta] = useState(initialMetaData); //initially is loading True

  const fetchResult = async (searchValue) => {
    try {
      const response = await fetch(`wordsearch/${searchValue}`); //needs to be the same as in setupProxy
      const data = await response.json();
      setResult(data);
      setMeta({ ...meta, isLoading: false });
    } catch (error) {
      setMeta({ ...meta, isError: true, errorMsg: error.message });
    }
  };

  const handleSearch = async (searchValue) => {
    setMeta({ ...meta, isLoading: true });
    const start = Date.now();
    await fetchResult(searchValue);
    const stop = Date.now();
    setMeta({ ...meta, isLoading: false, duration: stop - start });
  };

  const handleIncrementSearch = async (searchValue) => {
    if (!result) return await handleSearch(searchValue);

    setMeta({ ...meta, isLoading: true });
    const start = Date.now();
    const words = await asyncFilter(result.words, (word) =>
      word.includes(searchValue)
    );
    const stop = Date.now();
    setMeta({ ...meta, isLoading: false, duration: stop - start });
    setResult({ words, searchDurationInMilliseconds: 0 });
  };

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setSearchText(value);
    if (value.length <= 0) return handleReset();
    await handleIncrementSearch(value);
  };

  const handleReset = () => {
    setResult(null);
    setSearchText("");
    setMeta(initialMetaData);
  };

  const loading = (
    <div className="row">
      <h3>Loading ...</h3>
    </div>
  );
  const error = (
    <div className="row">
      <h3>Error</h3>
      <label>{meta.errorMsg}</label>
    </div>
  );

  return (
    <div className="row">
      <div className="col">
        <h2>Inkrementelle Suche - Testseite</h2>
        <form>
          <label>Suchbegriff eingeben:</label>
          <input
            className="m-2"
            type="text"
            value={searchText}
            onChange={handleInputChange}
          ></input>
        </form>
      </div>
      <div className="col">
        {result && (
          <label>
            Benötigte Zeit im Backend: {result.searchDurationInMilliseconds} ms
          </label>
        )}
        <br />
        {meta.duration > 0 && (
          <label>Benötigte Zeit im Frontend: {meta.duration} ms</label>
        )}
        <br />
        {result && (
          <button className="btn btn-secondary mt-4" onClick={handleReset}>
            Suche zurücksetzen
          </button>
        )}
      </div>
      <>
        {meta.isLoading && loading}
        {meta.isError && error}
      </>
      <div className="row">
        {result && !meta.isLoading && (
          <table className="col-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Suchergebnis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {result.words.map((word, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{word}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchIncrement;
