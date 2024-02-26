import _superagent from 'superagent';
const SuperagentPromise = require('superagent-promise');
const superagent = SuperagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT; // local & dev

const encode = encodeURIComponent;
const responseBody = (res: any) => res.body;

let token: any = null;
const tokenPlugin = (req: any) => {
  if (token) {
    req.set('authorization', `Bearer ${token}`);
  }
}
const requests = {
  del: (url: string) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url: string, body: any) =>
    superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: any) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  file: (url: string, key: string, file: any) =>
    superagent.post(`${API_ROOT}${url}`).attach(key, file).use(tokenPlugin).then(responseBody),
};

const Auth = {
  signin: (body: any) =>
    requests.post(`signin`, body),
};
const Advertisements = {
  create: (body: any) =>
    requests.post(`advertisements`, body),
  pagination: () =>
    requests.get(`advertisements`),
  _id: (_id: string) =>
    requests.get(`advertisements/${_id}`),
  update: (body: any, id: string) =>
    requests.patch(`advertisements/${id}`, body),
};

export default {
  API_ROOT,
  Auth,
  Advertisements,
  encode,
  setToken: (_token?: string) => { token = _token; }
};
