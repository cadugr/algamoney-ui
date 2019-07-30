import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import 'rxjs/add/operator/toPromise';

export class LancamentoFiltro {
  descricao: string
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5
}// definindo um contrato (ajuda com erros em tempo de desenvolvimento)

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    params.set('page', filtro.pagina.toString())
    params.set('size', filtro.itensPorPagina.toString())

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
          moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'))
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
          moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'))
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, {headers, search: params})
       .toPromise()
       .then(response => {
         const responseJson = response.json();
         const lancamentos = responseJson.content;

         const resultado = {
           lancamentos,
           total: responseJson.totalElements
         }
         return resultado;
       })
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers})
       .toPromise()
       .then(() => null)
  }

}
