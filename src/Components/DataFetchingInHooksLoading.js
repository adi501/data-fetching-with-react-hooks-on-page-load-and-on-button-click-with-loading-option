import React, { Fragment, useState, useEffect } from "react";

import axios from "axios";

function DataFetchingInHooksLoading() {
  const [data, setData] = useState({ hits: [] });

  const [query, setQuery] = useState("redux");

  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(url);

      setData(result.data);

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <center>
        <h5>
          Data Fetching with React Hooks, On Page load and on button click, With
          Loading Option
        </h5>
      </center>

      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <button
        type="button"
        onClick={() =>
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}

      <div>Ref: https://www.robinwieruch.de/react-hooks-fetch-data</div>
    </Fragment>
  );
}

export default DataFetchingInHooksLoading;
