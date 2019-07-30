import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private confirmation: ConfirmationService) { }

  ngOnInit() {
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

  excluir(pessoa: any) {
    console.log(pessoa)
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

}
