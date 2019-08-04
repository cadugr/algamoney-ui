import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [
  { path: '', redirectTo: '/lancamentos', pathMatch: 'full' },
  { path: 'lancamentos', component: LancamentosPesquisaComponent},
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
  { path: 'pessoas', component: PessoasPesquisaComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: '**', redirectTo: '/pagina-nao-encontrada'}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
