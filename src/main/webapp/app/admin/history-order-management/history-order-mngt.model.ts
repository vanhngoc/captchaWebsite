import { User } from '../user-management/user-management.model';

export interface IHistoryOrderManagement {
  orderId?: number;
  orderDate?: string;
  orderStatus?: string;
  orderNumber?: string;
  totalCost?: number;
  quantityCaptcha?: number;
  user?: User;
  createdDate?: Date;
  createdBy?: string;
}

export class HistoryOrderManagement implements IHistoryOrderManagement {
  constructor(
    public orderId?: number,
    public orderDate?: string,
    public orderStatus?: string,
    public orderNumber?: string,
    public totalCost?: number,
    public quantityCaptcha?: number,
    public user?: User,
    public createdDate?: Date,
    public createdBy?: string
  ) {}
}
