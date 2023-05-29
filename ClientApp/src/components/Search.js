import React, { useState, useRef } from 'react';

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const [result, setResult] = useState();
    const [meta, setMeta] = useState({ isLoading: false, isError: false, errorMsg: '', duration:0 }); //initially is loading True
    const fetchResult = async (searchValue) => {
        try {
            const response = await fetch(`wordsearch/${searchValue}`); //needs to be the same as in setupProxy
            const data = await response.json();          
            setResult(data);
            setMeta({ ...meta, isLoading: false });
        } catch (error) {
            setMeta({ ...meta, isError: true, errorMsg: error.message });
        }
    }

    if (meta.isLoading) return (<h3>Loading ... </h3>)
    if (meta.isError) return (<div>
        <h3>An Error occured.</h3>
        <label>{meta.errorMsg}</label>
    </div>)

    const handleFocus = (event) => event.target.select();
    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchText.length <= 0) return;
        setMeta({ ...meta, isLoading: true });
        const start = Date.now();
        await fetchResult(searchText)
        const stop = Date.now();
        setMeta({ ...meta, isLoading: false, duration: stop - start });
    }

    return (
        <div>
            <form className="flex justify-center" onSubmit={handleSearch}>
                <label>Suchbegriff eingeben:{' '}</label>
                <input className="m-2" type="text" autoFocus onFocus={handleFocus} value={searchText} onChange={async (e) => {
                    const { value } = e.target;
                    //setMeta({ ...meta, isLoading: true }); //inkrementelles Suchen (nicht optimiert)
                    //await fetchResult(value);
                    //setMeta({ ...meta, isLoading: false });
                    setSearchText(value);
                }}></input>
                <input type="submit" className="btn btn-primary" value="suchen"></input>
            </form>
            <div>
                {result && (<label>Benötigte Zeit im Backend: {result.searchDurationInMilliseconds} ms</label>)}
                <br />
                {meta.duration > 0 && (<label>Benötigte Zeit im Frontend: {meta.duration} ms</label>)}
            </div>
            <div>
                <ol>
                    {result && result.words.map((word) => (<li key={word}>{word}</li>))}
                </ol>
            </div>
        </div>
    )
}

export default Search;