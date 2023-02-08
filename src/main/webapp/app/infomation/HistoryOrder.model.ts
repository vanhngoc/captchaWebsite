export interface IHistoryOrder {
  orderId?: number;
  orderDate?: string;
  orderStatus?: string;
  orderNumber?: string;
  totalCost?: number;
  quantityCaptcha?: number;
  userId?: number;
  createdDate?: Date;
}

export class HistoryOrder implements IHistoryOrder {
  constructor(
    public orderId?: number,
    public orderDate?: string,
    public orderStatus?: string,
    public orderNumber?: string,
    public totalCost?: number,
    public quantityCaptcha?: number,
    public userId?: number,
    public createdDate?: Date
  ) {}
}
