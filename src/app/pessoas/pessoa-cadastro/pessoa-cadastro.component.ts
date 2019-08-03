import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { PessoaService } from 'app/pessoas/pessoa.service';
import { Pessoa } from 'app/core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService) { }


  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
       .then(() => {
         this.toasty.success('Pessoa adicionada com sucesso!')
         form.reset()
         this.pessoa = new Pessoa()
       })
       .catch(erro => this.errorHandler.handle(erro))
  }

}
