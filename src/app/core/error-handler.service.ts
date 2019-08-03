import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = JSON.parse(errorResponse._body)[0].mensagemUsuario
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.'
    }
    this.toasty.error(msg);
  }

}
