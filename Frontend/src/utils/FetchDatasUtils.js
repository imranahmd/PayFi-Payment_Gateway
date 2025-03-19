import React, { useState, useEffect } from 'react';

const FetchDatasUtils = ({ url, method, headers, body }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestUrl, setRequestUrl] = useState(null); // Added state to store the URL


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setRequestUrl(url); // Set the URL when it changes

  }, [url, method, headers, body]);

  return { data, error, loading,url: requestUrl };
};

export default FetchDatasUtils;
