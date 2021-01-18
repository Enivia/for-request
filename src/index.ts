import RequestClass from './request';
import { Request } from './interface';

const entity = new RequestClass();
const request = entity.request as Request;
request.config = entity.config;
request.get = (...args) => entity.get(...args);
request.post = (...args) => entity.post(...args);
request.put = (...args) => entity.put(...args);
request.delete = (...args) => entity.delete(...args);

export default request;
