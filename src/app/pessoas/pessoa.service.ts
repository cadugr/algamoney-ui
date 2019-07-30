import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
  nome: string
  pagina = 0;
  itensPorPagina = 5
}// definindo um contrato (ajuda com erros em tempo de desenvolvimento)

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    params.set('page', filtro.pagina.toString())
    params.set('size', filtro.itensPorPagina.toString())

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoasUrl, { headers, search: params})
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
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(this.pessoasUrl, {headers})
        .toPromise()
        .then(response => response.json().content)
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
       .toPromise()
       .then(() => null)
  }

}
