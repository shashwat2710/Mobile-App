import axios from "axios";

const api = axios.create();

export default {
    makeApiRequest: (configParams:any) => {
      let config = {
        method: configParams.methodType,
        url: configParams.url,
        data: configParams.data ? configParams.data : "",
        params: configParams.params ? configParams.params : "",
        auth: configParams.auth ? configParams.auth : "",
        headers: configParams?.headers
          ? {
              ...configParams.headers,
              Accept: "application/json, application/octet-stream, text/plain",
            }
          : {
              "Content-Type": "application/json",
              Accept: "application/json, application/octet-stream, text/plain",
            },
      };
      return api(config);
    },
  };