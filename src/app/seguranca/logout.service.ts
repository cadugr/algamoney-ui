import { AuthService } from 'app/seguranca/auth.service';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LogoutService {

  tokenRevokeUrl = 'http://localhost:8080/tokens/revoke'

  constructor(private http: AuthHttp,
             private auth: AuthService) { }

logout() {
  return this.http.delete(this.tokenRevokeUrl, {withCredentials: true})
     .toPromise()
     .then(() => {
       this.auth.limparAccessToken()
     })
}

}
