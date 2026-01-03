/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react";

const WithDataFetching = (WrappedComponent, url) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [url]);

    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && <WrappedComponent data={data} {...props} />}
      </div>
    );
  };
};

export default WithDataFetching;
