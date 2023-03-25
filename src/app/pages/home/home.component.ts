import { Component , OnInit} from '@angular/core';
import { DataService } from 'src/app/data.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit   {
  clients = Array();

  constructor(private dataSevice: DataService) {
  }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.clients = this.dataSevice.clients
      console.log(this.clients, 'desde home')
    }, 500); 
     
  }
  
  goToDetail(id : string) {
    console.log('esto es en el home', id)
    this.dataSevice.getClientDetail(`${id}`)
  }

  deleteClient(id: String) {
    Swal.fire({
      title: 'De Verdad quieres Eliminar este Cliente?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'si',
      denyButtonText: `no`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.dataSevice.deleteClient(id)
        this.ngOnInit()
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Listo! mejor no borremos nada', '', 'info')
      }
    })
    // console.log('esto es en el home', id)
    
  }
}
