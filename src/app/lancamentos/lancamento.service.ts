import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Lancamento } from 'app/core/model';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

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

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

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

    return this.http.get(`${this.lancamentosUrl}?resumo`, {search: params})
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
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
       .toPromise()
       .then(() => null)
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
        .toPromise()
        .then(response => response.json())
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento))
       .toPromise()
       .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado]);
         return lancamentoAlterado
       })
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
       .toPromise()
       .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamento]);
         return lancamento
       })
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
