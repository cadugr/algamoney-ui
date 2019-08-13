import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Pessoa } from 'app/core/model';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  pessoa = new Pessoa();
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private confirmation: ConfirmationService,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas')
    this.carregarPessoa(1)
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmaExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    })
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPeloCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
       .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.first = 0;
          }
          this.toasty.success('Pessoa excluída com sucesso!')
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
