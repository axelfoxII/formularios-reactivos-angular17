import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormReactivoComponent } from "./form-reactivo/form-reactivo.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormReactivoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'formulario-angular17';
}
