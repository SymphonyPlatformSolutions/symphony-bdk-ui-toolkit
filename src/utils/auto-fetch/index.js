import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RestClient from '../rest-client';

export const useAutoFetch = ({ endpoint, params, handleData }) => {
  if (!endpoint) {
    return {};
  }
  const [config, setConfig] = useState({ endpoint, params, handleData });

  const [results, setResults] = useState([]);
  const [isDataLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await RestClient.get(config.endpoint, config.params, false);
      if (config.handleData) {
        setResults(config.handleData(response.data));
      } else {
        setResults(response.data);
      }
      setLoading(false);
      setError(null);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const refreshData = (newConfig) => {
    if (newConfig) {
      setConfig(prevState => ({
        ...prevState,
        ...newConfig,
      }));
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [config]);

  return {
    results,
    isDataLoading,
    error,
    refreshData,
  };
};

useAutoFetch.propTypes = {
  endpoint: PropTypes.string,
  params: PropTypes.object,
  handleData: PropTypes.Function,
};

useAutoFetch.defaultProps = {
  endpoint: null,
  params: null,
  handleData: null,
};
