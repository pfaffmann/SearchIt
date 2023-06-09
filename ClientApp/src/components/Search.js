import React, { useState } from "react";

const initialMetaData = {
  isLoading: false,
  isError: false,
  errorMsg: "",
  duration: 0,
};

const Search = () => {
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

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchText.length <= 0) return;
    setMeta({ ...meta, isLoading: true });
    const start = Date.now();
    await fetchResult(searchText);
    const stop = Date.now();
    setMeta({ ...meta, isLoading: false, duration: stop - start });
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleReset = () => {
    setResult(null);
    setSearchText("");
    setMeta(initialMetaData);
  };

  if (meta.isLoading) return <h3>Loading ... </h3>;
  if (meta.isError)
    return (
      <div>
        <h3>An Error occured.</h3>
        <label>{meta.errorMsg}</label>
      </div>
    );

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSearch}>
          <label>Suchbegriff eingeben:</label>
          <input
            className="m-2"
            type="text"
            value={searchText}
            onChange={handleInputChange}
            autoFocus
            onFocus={handleFocus}
          ></input>
          <input
            type="submit"
            className="btn btn-primary"
            value="suchen"
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
      <div className="row">
        {result && (
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

export default Search;
