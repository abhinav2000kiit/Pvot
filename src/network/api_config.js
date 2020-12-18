import axios from 'axios';

const baseURL = 'https://api.pvot.in';
const baseURLv2 = 'https://api.pvot.in';
const baseURL2 = 'https://api.pvot.in';
const api_key = '37894375-8353-42d9-8c51-a657c016a3f6';

class Api {
  static headers(headersparams) {
    return {
      // 'Postman-Token': api_key,
      ...headersparams
    };
  }

  static get(route) {
    return this.request(route, null, 'GET');
  }

  static put(route, params) {
    return this.request(route, params, 'PUT');
  }

  static post(route, params) {
    return this.request(route, params, 'POST');
  }

  static delete(route, params) {
    return this.request(route, params, 'DELETE');
  }

  static deleteWithToken(route, params, token) {
    return this.customRequest(route, 'DELETE', params, token);
  }  
  
  static getWithParamToken(route, params) {
    return this.customRequest(route, 'GET', params);
  }

  static postWithToken(route, params, token) {
    return this.customRequest(route, 'POST', params, token);
  }

  static patch(route, params, token) {
    return this.request(route, params, 'PATCH');
  }

  static patchWithToken(route, params, token) {
    return this.customPatchRequest(route, params, token, 'PATCH');
  }

  static postBankAccount(route, params, token) {
    return this.requestBankAccount(route, params, token, 'POST');
  }

  static getWithToken(route, token) {
    return this.requestBankAccount(route, null, token, 'GET');
  }
  static postWithBodyToken(route, params, token){
    return this.customTokenRequest(route, 'POST', params, token);
  }

  static request(route, params, verb) {
    const host = baseURL;
    const url = `${host}${route}`;
    const options = { method: verb, data: params };
    options.headers = Api.headers();
    console.log(`Options*******************${JSON.stringify(options)}`);
    console.log(`URL*********************${JSON.stringify(url)}`);
    return axios(url, options);
  }

  static customRequest(route, verb, payload) {
    console.log('hereeeee!', payload);
    const host = baseURLv2;
    const url = `${host}${route}`;
    const options = {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${payload.accesstoken}`
      },
      data: payload
    };

    console.log(`Options*******************${JSON.stringify(options)}`);
    console.log(`URL*********************${JSON.stringify(url)}`);

    return axios(url, options);
  }

  static customTokenRequest(route, verb, payload, token) {
    console.log('hereeeee!', payload);
    const host = baseURLv2;
    const url = `${host}${route}`;
    const options = {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      data: payload
    };

    console.log(`Options*******************${JSON.stringify(options)}`);
    console.log(`URL*********************${JSON.stringify(url)}`);

    return axios(url, options);
  }


  static customPatchRequest(route, params, token, verb) {
    console.log('hereeeee!', params);
    const host = baseURLv2;
    const url = `${host}${route}`;
    const options = {
      method: verb,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      data: params
    };

    console.log(`Options*******************${JSON.stringify(options)}`);
    console.log(`URL*********************${JSON.stringify(url)}`);

    return axios(url, options);
  }


  static customFormDataRequest(route, verb, payload) {
    console.log('payload!', payload);
    console.log('route!', route);
    console.log('verb!', verb);
    const host = baseURLv2;
    const url = `${host}${route}`;
    const options = {
      method: verb,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${payload.accesstoken}`
      },
      data: payload.payload
    };

    console.log(`Options*******************${JSON.stringify(options)}`);
    console.log(`URL*********************${JSON.stringify(url)}`);

    return axios(url, options);
  }

  static requestBankAccount(route, params, token, verb) {
    const host = baseURL2;
    const url = `${host}${route}`;
    let options;

    options = { method: verb, data: params };
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    };

    console.log(`Options*******************${JSON.stringify(options)}`);
    console.log(`URL*********************${JSON.stringify(url)}`);
    return axios(url, options);
  }

}

export default Api;
