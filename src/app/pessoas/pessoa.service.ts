import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Pessoa } from 'app/core/model';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
  nome: string
  pagina = 0;
  itensPorPagina = 5
}// definindo um contrato (ajuda com erros em tempo de desenvolvimento)

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString())
    params.set('size', filtro.itensPorPagina.toString())

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoasUrl, { search: params})
       .toPromise()
       .then(response => {
         const responseJson = response.json();
         const pessoas = responseJson.content;

         const resultado = {
           pessoas,
           total: responseJson.totalElements
         }
         return resultado;
       })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
        .toPromise()
        .then(response => response.json().content)
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
       .toPromise()
       .then(() => null)
  }

  mudarStatus(pessoa: any): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}/ativo`, !pessoa.ativo)
        .toPromise()
        .then(() => null)
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
        .toPromise()
        .then(response => response.json())
  }

  buscarPeloCodigo(codigo: number): Promise<Pessoa> {

    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json())
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json())
  }

}
