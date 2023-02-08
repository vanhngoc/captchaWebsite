export interface IUpdateCaptcha {
  merchantKey: string;
  captcha: number;
  totalCost: number;
}

export class UpdateCaptcha implements IUpdateCaptcha {
  constructor(public merchantKey: string, public captcha: number, public totalCost: number) {}
}
