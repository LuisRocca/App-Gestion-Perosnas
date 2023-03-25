import { Component, OnInit,} from '@angular/core';
import { DataService } from 'src/app/data.service';

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
    
  }

  onSubmit() {
    this.dataSevice.autLoginClients(this.username, this.password)
  }
}
