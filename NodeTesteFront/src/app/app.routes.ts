import { Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TagsComponent } from './components/tags/tags.component';
import { ClienteAirTagComponent } from './components/cliente-air-tag/cliente-air-tag.component';

export const routes: Routes = [
    { path: '', component: ClientesComponent },
    { path: 'Tags', component: TagsComponent },
    { path: 'ClienteAirTag', component: ClienteAirTagComponent },
    { path: '**', redirectTo: '' }
];