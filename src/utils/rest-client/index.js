import axios from 'axios';

/*
  Abstraction layer for API calls. In this case, using AXIOS.
  Custom headers can be used. If not, the default header will be Authorization, with "jwt".
  Each call (get/post/put/delete) can use the "base url" (default) or use full path.
*/
class RestClient {
  jwt = null;

  baseUrl = null;

  headers = {};

  setBaseConfig = ({ baseUrl, jwt, headers }) => {
    this.jwt = jwt;
    this.baseUrl = baseUrl;
    this.headers = headers;
  };

  convertToAxiosParams = (params) => {
    // the params should always be an object or null/undefined
    if (!params) {
      return null;
    }

    let axiosParams = { ...params };
    const keys = Object.keys(params);

    // convert arrays to string, separated by comma
    keys.forEach((key) => {
      if (Array.isArray(params[key])) {
        axiosParams = {
          ...axiosParams,
          [key]: params[key].join(','),
        };
      }
    });

    return axiosParams;
  };

  makeUrl = (endpoint, useBaseUrl) => (
    useBaseUrl ? `${this.baseUrl}/${endpoint[0] === '/' ? endpoint.slice(1) : endpoint}` : endpoint
  );

  makeApiAttributes = params => ({
    headers: this.headers,
    params: this.convertToAxiosParams(params),
  });

  setJwt(jwt) {
    this.jwt = jwt;
    this.headers = {

      ...this.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }

  getJwt() {
    return this.jwt;
  }

  setCustomHeaders(headers) {
    this.headers = headers;
  }

  get(endpoint, params = null, useBaseUrl = true) {
    return axios.get(
      this.makeUrl(endpoint, useBaseUrl),
      this.makeApiAttributes(params),
    );
  }

  post(endpoint, body = null, params = null, useBaseUrl = true) {
    return axios.post(
      this.makeUrl(endpoint, useBaseUrl),
      body,
      this.makeApiAttributes(params),
    );
  }

  put(endpoint, body = null, params = null, useBaseUrl = true) {
    return axios.put(
      this.makeUrl(endpoint, useBaseUrl),
      body,
      this.makeApiAttributes(params),
    );
  }

  delete(endpoint, params = null, useBaseUrl = true) {
    return axios.delete(
      this.makeUrl(endpoint, useBaseUrl),
      this.makeApiAttributes(params),
    );
  }
}

// singleton instance
const instance = new RestClient();
export default instance;
