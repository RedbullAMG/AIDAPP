import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController) { 
    this.formularioRegistro = this.fb.group({

      'usuario': new FormControl("", [Validators.required, noNumbersValidator]),
      'rut': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, passwordValidator]),
      'confirmacionPassword': new FormControl ("", [Validators.required, passwordValidator])

    });

    
  }

  ngOnInit() {
  }



  async guardar(){
    var formul = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      
      const alert = await this.alertController.create({
        header: 'Aviso!',
        subHeader: 'Presta Atención',
        message: 'Tienes que llenar todos los campos e ingresar datos correctos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
      
    }else{

      const alert = await this.alertController.create({
        
        message: 'Registrado!'
        
      });
      await alert.present();
    }

    

    var nom = {
      email: formul.email,
      password: formul.password,
      usuario: formul.usuario
    }

    localStorage.setItem('nom',JSON.stringify(nom))

  }

  

}

function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.value;
  const hasFourNumbers = /\d{4}/.test(password);
  const hasThreeCharacters = /[a-zA-Z]{3}/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  if (hasFourNumbers && hasThreeCharacters && hasUppercase) {
    return null; 

  } else {
    return { invalidPassword: true }; 
  }
}


function noNumbersValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const username = control.value;
  const hasNumbers = /\d/.test(username); 

  if (hasNumbers) {
    return { containsNumbers: true }; 
  } else {
    return null; 
  }
}
