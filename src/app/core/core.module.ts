import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { CategoriaService } from 'app/categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(), // só utiliza este forRoot, se estiver importando no módulo principal
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
