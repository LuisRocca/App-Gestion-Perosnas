import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {
    clients = Array();
    countries = Array();
    sesionState : Number = 0;
    bearerToken : String = 'Bearer'
    clientDetail : object = {}
    modafiFalg : Boolean = false;
    idClientModifi : String = ''
  // private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private router: Router) { }

  autLoginClients(username : string, password : string) {
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 
              'application/json;charset=utf-8'
      },
        body:JSON.stringify({UserName: `${username}`,Password: `${password}`})      
      }
          fetch("https://lab.app.invertebrado.co/api/account/login", options) 
        .then( async response => {
          const Data = await response.json()
          if ( !Data.error ) {
            this.bearerToken = Data.Token
            this.sesionState = Data.Status
            this.getClients()
            this.router.navigate(['home']);
            //  console.log( 'lo logro' )
          } else {
            alert('eppaaaaa careloco')
          }
        })
  }

  getClients() {
    let options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`
        },
      }
          fetch("https://lab.app.invertebrado.co/api/subscribers/", options) 
        .then( async response => {
          const  {Data} = await response.json()
          console.log(Data, 'este es mi console.log')
          this.clients = Data
        })
        .catch(error => {
          // Manejo de errores de la solicitud Fetch
        });      
  }

  getCountries() {
    let options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`
        },
      }
          fetch("https://lab.app.invertebrado.co/api/countries/", options) 
        .then( async response => {
          const  {Data} = await response.json()
          console.log(Data, 'este es mi console.log')
          this.countries = Data
        })
        .catch(error => {
          // Manejo de errores de la solicitud Fetch
        });      
  }

  getClientDetail(id : String) {
    let options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
    }
        fetch(`https://lab.app.invertebrado.co/api/subscribers/${id}`, options) 
      .then( async response => {
        const Data = await response.json()
        console.log(Data, 'este es mi console.log')
        this.clientDetail = Data
        // this.clients = Data
      })
      .catch(error => {
        console.error('Error en la solicitud fetch:', error);
        // Manejo de errores de la solicitud Fetch
      });
  }

  potsCreateClients(subscribers = Array()) {
    let options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body:JSON.stringify({Subscribers: subscribers}) 
    }
        fetch("https://lab.app.invertebrado.co/api/subscribers/", options) 
      .then( async response => {
        const Data = await response.json()
        console.log(Data, 'este es mi console.log')
        this.getClients()
      })
      .catch(error => {
        // Manejo de errores de la solicitud Fetch
      }); 
  }

  putClient( subscriber : Object, id : String) {

    let options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body:JSON.stringify( subscriber ) 
    }
        fetch(`https://lab.app.invertebrado.co/api/subscribers/${id}`, options) 
      .then( async response => {
        const  Data = await response.json()
        console.log(Data, 'este es mi console.log')
        this.getClients()
      })
      .catch(error => {
        // Manejo de errores de la solicitud Fetch
      }); 
  }
  
  deleteClient(id : String) {
    
    let options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.bearerToken}`,
      },
      
    }
        fetch(`https://lab.app.invertebrado.co/api/subscribers/${id}`, options) 
      .then( async response => {
        const  Data = await response.json()
        console.log(Data)        
        this.getClients()
      })
      .catch(error => {
        // Manejo de errores de la solicitud Fetch
      }); 
  }
}
