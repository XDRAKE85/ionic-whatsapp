import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  phone_number:Number;
 
  constructor( private common: CommonService) {
    
   }

  ngOnInit() {
  }
  savePhone(){
    console.log('guardar',this.phone_number)
    this.common.setItem('phone-number',this.phone_number).then(
        (response) => {
          if(response){
            this.common.msg('El numero ha sido asignado')
            this.common.navRoot('/home')
          } else {
            this.common.msg('Ha ocurrido un error al guardar el numero')
          }
        }
      );
  }
}
