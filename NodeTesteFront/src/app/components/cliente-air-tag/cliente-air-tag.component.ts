import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clienteModel } from '../../models/cliente.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ClienteAirTagService } from '../../services/cliente-air-tag.service';
import { clienteAirTagModel } from '../../models/clienteAirTag.model';
import { tagModel } from '../../models/tag.model';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-cliente-air-tag',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './cliente-air-tag.component.html',
  styleUrl: './cliente-air-tag.component.css'
})
export class ClienteAirTagComponent implements OnInit {
  public cliente: clienteModel = new clienteModel(0, '', '')
  public clienteAirTag: clienteAirTagModel[] = []
  public airTagsDisponiveis: tagModel[] = []
  public inserindoNovaTag: boolean = false
  public aliasNovaLocacao: string = ""
  public codigoTagNovaLocacao: number = 0

  constructor(private router: Router, private clienteAirTagService: ClienteAirTagService, private tagService: TagService, private cd: ChangeDetectorRef) {
    var navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state)
      this.cliente = navigation.extras.state['data']
  }

  ngOnInit(): void {
    this.carregarLocacoes()
    this.carregarAirTagsDisponiveis()
  }

  public obterCalculoValorLocacao(clienteAirTag: clienteAirTagModel) {
    var dataFimCalculo = new Date()
    if (clienteAirTag.DataFimLocacao)
      dataFimCalculo = new Date(clienteAirTag.DataFimLocacao)

    var dataInicioCalculo = new Date(clienteAirTag.DataInicioLocacao)

    var diferencaEntreDatas = Math.abs(dataFimCalculo.getTime() - dataInicioCalculo.getTime())
    var diferencaMinutos = diferencaEntreDatas / (1000 * 60)

    return "R$ " + (diferencaMinutos * 0.52).toFixed(2)
  }

  public formatarData(data: Date | null): string {
    if (!data)
      return " - ";

    data = new Date(data)

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }

  devolverTag(codigoLocacao: number) {
    this.clienteAirTagService.DevolverAirTag(codigoLocacao).subscribe()
    this.carregarLocacoes()
    this.carregarAirTagsDisponiveis()
  }

  carregarLocacoes() {
    this.clienteAirTagService.ObterAirTagsPorCliente(this.cliente.Codigo).subscribe(data => {
      this.clienteAirTag = data
    })

    this.cd.detectChanges()
  }

  carregarAirTagsDisponiveis() {
    this.tagService.obterAirTagsDisponiveis().subscribe(data => {
      this.airTagsDisponiveis = data
    })

    this.cd.detectChanges()
  }

  locarNovaAirTag() {
    this.clienteAirTagService.InserirLocacaoAirTag(this.cliente.Codigo, this.codigoTagNovaLocacao, this.aliasNovaLocacao).subscribe(data => {
      this.carregarLocacoes()
      this.limparCamposLocacao()
    })
  }

  limparCamposLocacao() {
    this.codigoTagNovaLocacao = 0
    this.aliasNovaLocacao = ""

    this.inserindoNovaTag = !this.inserindoNovaTag

    this.cd.detectChanges()
  }
}
