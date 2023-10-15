// import { notification } from 'antd';
import axios from 'axios';
import axiosRetry from 'axios-retry';
// window.externalConfigChecked = false; // flag for externalized config check
// window.externalConfigAlerted = false;
axiosRetry(axios, {
  retries: 5,
});
function makeUrls() {
  return 'https://backend.api.moretech.pepeshka.ru';
  // return 'http://130.193.52.232';
}

class RestClient {
  static getAxios(url: string, additionalHeaders = {}) {
    const config = {
      method: 'get',
      url: makeUrls() + url,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        ...additionalHeaders,
      },
    };
    return axios(config);
  }
  static postAxios(url: string, data: object, additionalHeaders = {}) {
    const config = {
      method: 'post',
      url: makeUrls() + url,
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZXBlZ2FAbWFpbC5ydSIsImlhdCI6MTY5NzMyMjEzMSwiZXhwIjoxNzI4ODUzMjAwLCJjdXJyZW50VXNlcklkIjoxLCJjdXJyZW50VXNlciI6InBlcGVnYUBtYWlsLnJ1IiwiZXhwaXJhdGlvbkRhdGUiOjE3Mjg4NTMyMDAwMDB9.fG7MF03UHvf2YhT4bpg_v2rfZMTGmZ3T0CNPvN_RLzMimCpDS67inJZBk1iejkXJ5Y-PpXL2Q23AxwiR5EQpUg',
        // sessionStorage.getItem('token'),
        ...additionalHeaders,
      },
      data: data,
    };
    return axios(config);
  }

  static patchAxios(url: string, data: object) {
    const config = {
      method: 'patch',
      url: makeUrls() + url,

      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      data: data,
    };
    return axios(config);
  }

  static async deleteAxios(url: string) {
    const config = {
      method: 'delete',
      url: makeUrls() + url,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    return axios(config);
  }
}

export default RestClient;
