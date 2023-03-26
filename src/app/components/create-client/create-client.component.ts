import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  name: String = '';
  email: String = '';
  countryCode: any = '';
  jobTitle: String = '';
  phoneNumber: String = '';
  datapost = Array()
  constructor( private dataSevice: DataService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit() {

    Swal.fire({
      title: 'quieres crear de una vez otro cliente? si respondes solo crear este se te redirecionara al home de lo contrario puedes cerar cuantos usuarios volviendo a diligenciar el formulario quieres de una vez',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Agregar Mas',
      denyButtonText: `Solo Este Usuario`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      const dataDistributor = this.countryCode.split(" ", )
        this.datapost.push({
          "Name": this.name,
          "Email": this.email,
          "CountryCode": dataDistributor[0],
          "PhoneNumber": `${dataDistributor[1]}` + `${this.phoneNumber}`,
          "JobTitle": this.jobTitle,
          "Area": "Limitrofe",
          "Topics": []})
      if (result.isConfirmed) {        
          this.name = ''
          this.email = ''
          this.phoneNumber = ''
          this.jobTitle = ''
          this.countryCode = ''      
        Swal.fire('se agrego con exito a la lista para crear!', '', 'success')
      } else if (result.isDenied) {
          this.dataSevice.potsCreateClients(this.datapost)
        Swal.fire('Listo! Se agregaron todos los clientes con exito', '', 'success')
        this.router.navigate(['/home'])
      }
    })   
    console.log(this.datapost, 'este es') 
  }

  onSubmitModifi() {
    Swal.fire({
      title: 'Seguro que desea modificar la informacion de este usuario? ',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'si',
      denyButtonText: `no`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      const dataDistributor = this.countryCode.split(" ", )
        const dataToModifi = {
          "Name": this.name,
          "Email": this.email,
          "CountryCode": dataDistributor[0],
          "PhoneNumber": `${dataDistributor[1]}` + `${this.phoneNumber}`,
          "JobTitle": this.jobTitle,
          "Area": "Limitrofe",
          "Topics": []}
      if (result.isConfirmed) {        
        this.dataSevice.putClient(dataToModifi, this.dataSevice.idClientModifi)
        this.dataSevice.modafiFalg = false;
        this.dataSevice.idClientModifi = ''
        Swal.fire('se modifico con exito!', '', 'success')
        this.router.navigate(['/home'])
      } else if (result.isDenied) {         
        Swal.fire('Listo!', '', 'success')       
      }
    })   
  }

  handleSubmit() {
    this.dataSevice.modafiFalg ? this.onSubmitModifi() : this.onSubmit()
  }
  goToHome() {
    this.router.navigate(['/home'])
  }
}
