import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = []
  pessoas = []
  lancamento = new Lancamento();
  titulo = 'Novo Lançamento'
  codigoLancamento: number

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.codigoLancamento = this.route.snapshot.params['codigo']
    if (this.codigoLancamento) {
      this.validaEdicao()
      this.carregarLancamento(this.codigoLancamento)
    }
    this.carregarCategorias()
    this.carregarPessoas()
  }

  get editando() {
    return Boolean(this.codigoLancamento)
  }

  validaEdicao() {
    if (this.editando) {
      this.titulo = 'Edição de Lançamento'
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
       .then(lancamento => {
         this.lancamento = lancamento
       })
       .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.toasty.success('Lançamento adicionado com sucesso!')
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
       .then(lancamento => {
         this.lancamento = lancamento
         this.toasty.success('Lançamento alterado com sucesso')
       })
       .catch(erro => this.errorHandler.handle(erro))
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return {label: c.nome, value: c.codigo}
        })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo }
        })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset()
    setTimeout(function() {
      this.lancamento = new Lancamento()
    }.bind(this), 1)
    this.router.navigate(['/lancamentos/novo'])
  }

}
