import {useEffect, useState} from 'react';

const useFetch = alias => {
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(
          `https://jsonplaceholder.typicode.com/${alias}`
        );
        const data = await result.json();
        setResponse(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return {error, loading, response};
};

export default useFetch;
