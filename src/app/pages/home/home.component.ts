import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit   {

  constructor() {

  }
  ngOnInit(): void {
    fetch("https://lab.app.invertebrado.co/api/subscribers/", { method: "GET" })
  .then(response => {
    console.log(response,'ka info ')
    // Manejo de la respuesta del servidor
  })
  .catch(error => {
    // Manejo de errores de la solicitud Fetch
  });

  }


}
