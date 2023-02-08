import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoCaptcha } from './infoCaptcha.model';
import { HistoryOrder } from './HistoryOrder.model';
@Injectable({
  providedIn: 'root',
})
export class InfomationService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(newPassword: string, currentPassword: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account/change-password'), { currentPassword, newPassword });
  }

  getDetail(merchantKey: string): Observable<InfoCaptcha> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/account/get-remaining-captcha?merchantKey=' + merchantKey), {});
  }

  getHistoryOrders(): Observable<HistoryOrder[]> {
    return this.http.get<HistoryOrder[]>(this.applicationConfigService.getEndpointFor('api/account/get-history-order'), {});
  }
}
