import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/data.service';
import { detailUser } from 'src/app/type/usuario';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit   {
  clients = Array();
  clientdetail: detailUser = {}

  constructor(private dataSevice: DataService, private modalService: NgbModal,private router: Router,) {
  }

  ngOnInit(): void {
    this.dataSevice.getClients()
    setTimeout(() => {
      this.clients = this.dataSevice.clients
      console.log(this.clients, 'desde home')
    }, 500); 
     
  }
  
  goToModificate(id : string) {    
    this.dataSevice.modafiFalg = true;
    this.dataSevice.idClientModifi = id;
    this.router.navigate(['/create']);
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
        this.dataSevice.getClients()
        this.ngOnInit()
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Listo! mejor no borremos nada', '', 'info')
      }
    })
    // console.log('esto es en el home', id)
    
  }

 open(content: any,id : string) {
  this.dataSevice.getClientDetail(`${id}`)
  setTimeout(() => {
        this.clientdetail = this.dataSevice.clientDetail  
        console.log(this.clientdetail, '??')
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          // this.clientdetail = {}
          // this.dataSevice.clientDetail = {}
          console.log(`Cerrado con resultado: ${result}`);
        }, (reason) => {
          console.log(`Cerrado con razón: ${reason}`);
        });
      }, 500);
   
  }


}
