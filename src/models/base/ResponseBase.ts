import { ResponseMsg } from "../../constant/ReponseMsg";

export class ResponseBase<T> {
  data: T = undefined;
  message?: number | string = undefined;
  status?: number = undefined;

  constructor(data?: T, message?: number | string, status?: number) {
    this.data = data;
    this.message = message === undefined ? ResponseMsg.SUCCEED : message;
    this.status = status;
  }
}
