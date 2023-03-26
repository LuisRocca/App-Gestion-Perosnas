import { Component, OnInit,} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { I18n } from "i18n-js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;

  constructor(private dataSevice: DataService) {
  }

  ngOnInit(): void {
    const i18n = new I18n({
      en: {
        hello: "Hi!",
      },
      "pt-BR": {
        hello: "Olá!",
      },
    })
    console.log('este soy' , i18n)
  }

  onSubmit() {
    this.dataSevice.autLoginClients(this.username, this.password)
  }
}
