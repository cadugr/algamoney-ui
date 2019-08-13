import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { PessoaService } from 'app/pessoas/pessoa.service';
import { Pessoa } from 'app/core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  codigoPessoa: number;
  titulo = 'Nova Pessoa';

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title) { }


  ngOnInit() {
    this.codigoPessoa = this.route.snapshot.params['codigo']
    this.title.setTitle('Nova Pessoa')
    if (this.codigoPessoa) {
      this.validaEdicao()
      this.carregarPessoa(this.codigoPessoa)
    }
  }

  get editando() {
    return Boolean(this.codigoPessoa)
  }

  validaEdicao() {
    if (this.editando) {
      this.titulo = 'Edição de Pessoa'
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPeloCodigo(codigo)
       .then(pessoa => {
         this.pessoa = pessoa
         this.atualizarTituloEdicao()
       })
       .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toasty.success('Pessoa adicionada com sucesso!')
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo])
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
       .then(pessoa => {
         this.pessoa = pessoa
         this.toasty.success('Pessoa alterada com sucesso')
         this.atualizarTituloEdicao()
       })
       .catch(erro => this.errorHandler.handle(erro))
  }

  nova(form: FormControl) {
    form.reset()
    setTimeout(function() {
      this.pessoa = new Pessoa()
    }.bind(this), 1)
    this.router.navigate(['/pessoas/nova'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da Pessoa: ${this.pessoa.nome}`)
  }

}
