import React, { useState, useEffect } from 'react';

const FetchDatasUtilsTrans = ({ url, method, headers, body }) => {
  const [getdata, setGetData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestUrl, setRequestUrl] = useState(null); // Added state to store the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET', // Change method to GET
          headers,
          // Remove body for GET request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setGetData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setRequestUrl(url); // Set the URL when it changes
  }, [url, headers]); // Remove method and body from dependency array

  return { data, error, loading, url: requestUrl };
};

export default FetchDatasUtilsTrans;
