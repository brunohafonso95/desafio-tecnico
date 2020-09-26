import IHttpRequest from './IHttpRequest';
import IHttpResponse from './IHttpResponse';

export default interface IController {
  handleRoute(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
