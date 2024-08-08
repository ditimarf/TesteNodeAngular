import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { clienteModel } from '../../models/cliente.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit{
  clientes: clienteModel[] = [];
  cliente: clienteModel = new clienteModel(0, '', '');
  isEditing = false;

  constructor(private clienteService: ClienteService, private router:Router) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes);
  }

  addCliente(): void {
    if (this.isEditing) {
      this.clienteService.updateCliente(this.cliente).subscribe(() => {
        this.getClientes();
        this.isEditing = false;
        this.clearCliente()
      });
    } else {
      this.clienteService.addCliente(this.cliente).subscribe(() => {
        this.getClientes();
        this.clearCliente()
      });
    }
  }

  editCliente(cliente: clienteModel): void {
    this.cliente = { ...cliente };
    this.isEditing = true;
  }

  cancelEdition(){
    this.clearCliente()
    this.isEditing = false;
  }

  deleteCliente(codigo: number): void {
    this.clienteService.deleteCliente(codigo).subscribe(() => {
      this.getClientes();
    });
  }

  private clearCliente(){
    this.cliente = new clienteModel(0, '', '')
  }

  abrirDetalhesAirTags(cliente:clienteModel){
    this.router.navigate(['/ClienteAirTag'], {state: {data: cliente}})
  }
}
