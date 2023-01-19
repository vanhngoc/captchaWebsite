export interface IUpdateCaptcha {
  username: string;
  captcha: number;
}

export class UpdateCaptcha implements IUpdateCaptcha {
  constructor(public username: string, public captcha: number) {}
}
