import React, { useState } from 'react';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState();
  const [meta, setMeta] = useState({
    isLoading: false,
    isError: false,
    errorMsg: '',
    duration: 0,
  }); //initially is loading True

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
        <label>Suchbegriff eingeben:</label>
        <input
          className="m-2"
          type="text"
          value={searchText}
          onChange={async (e) => {
            const { value } = e.target;
            //setMeta({ ...meta, isLoading: true });
            //await fetchResult(value);
            //setMeta({ ...meta, isLoading: false });
            setSearchText(value);
          }}
        ></input>
        <button
          className="btn btn-primary"
          onClick={async () => {
            if (searchText.length <= 0) return;
            setMeta({ ...meta, isLoading: true });
            const start = Date.now();
            await fetchResult(searchText);
            const stop = Date.now();
            setMeta({ ...meta, isLoading: false, duration: stop - start });
          }}
        >
          suchen
        </button>
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
      </div>
      <div className="row">
        <table className="col-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Suchergebnis</th>
            </tr>
          </thead>
          <tbody>
            {result &&
              result.words.map((word, index) => (
                <tr key={index}>
                  <th>{index}</th>
                  <td>{word}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
