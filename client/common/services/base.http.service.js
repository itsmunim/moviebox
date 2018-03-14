import axios from 'axios';
import _ from 'lodash';

class BaseHttpService {
  static _instance;

  constructor() {
    this._httpManager = axios.create({
      baseURL: '/api/',
      timeout: 5000
    });
  }

  createRequest(url, method, headers, params, data) {
    let config = {url, method};
    if (headers) {
      config.headers = headers;
    }
    if (params) {
      config.params = params;
    }
    if (data) {
      config.data = data;
    }

    return this._httpManager(config);
  }

  static getInstance() {
    if (_.isUndefined(BaseHttpService._instance)) {
      BaseHttpService._instance = new BaseHttpService();
    }

    return BaseHttpService._instance;
  }

  static makeGETCall(endpoint, params, headers) {
    let request = BaseHttpService.getInstance().createRequest(endpoint, 'get', headers, params);
    return request.then((resp) => { return resp.data; });
  }

  static makePOSTCall(endpoint, data, headers) {
    let request = BaseHttpService.getInstance().createRequest(endpoint, 'post', headers, null, data);
    return request.then((resp) => { return resp.data; });
  }
}

export default BaseHttpService;
