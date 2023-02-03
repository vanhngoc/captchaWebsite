export interface IUpdateCaptcha {
  merchantKey: string;
  captcha: number;
}

export class UpdateCaptcha implements IUpdateCaptcha {
  constructor(public merchantKey: string, public captcha: number) {}
}
