import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    {nome: 'Carlos Eduardo Guerra Resende', cidade: 'Niterói', estado: 'RJ', ativo: 'true'},
    {nome: 'Jean Dutra Guerra Resende', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'Daniele Bragança Siqueira Machado', cidade: 'Niterói', estado: 'RJ', ativo: true},
    {nome: 'Julia Maria Guerra Resende', cidade: 'Niterói', estado: 'RJ', ativo: true},
    {nome: 'Alessandra Guerra Resende', cidade: 'Niterói', estado: 'RJ', ativo: false},
    {nome: 'Arli Lima Machado', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'Alan Araújo Lima', cidade: 'São Paulo', estado: 'SP', ativo: false},
    {nome: 'Mario Albino Pereira', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true}
  ]

}
