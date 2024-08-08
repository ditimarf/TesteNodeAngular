import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientesComponent } from "./components/clientes/clientes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'NodeTesteFront';
}
