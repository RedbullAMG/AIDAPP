import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import type { Animation, IonModal } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, AnimationController, IonCard, IonCardContent} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
 
  
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController, public animationCtrl: AnimationController) { 

    this.formularioLogin = this.fb.group({

      'email': new FormControl("",[Validators.required, Validators.email]),
      'password': new FormControl("",Validators.required)
    })
    

  

    

  }

  

 

  ngOnInit() {
    
  }

  async ingresar(){

    var formul = this.formularioLogin.value;
    var nom = JSON.parse(localStorage.getItem('nom')|| "[]");

    if(nom.email == formul.email && nom.password == formul.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('product-add')
    }
    else{
      const alert = await this.alertController.create({
        header: 'Aviso!',
        subHeader: 'Datos Incorrectos',
        message: 'Los datos que ingresaste son incorrectos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      
    }
    
  }


  async restablecer(){

    var formul = this.formularioLogin.value;
    var nom = JSON.parse(localStorage.getItem('nom')|| "[]");

    if(nom.email == formul.email){
      const alert = await this.alertController.create({
        
        message: 'Se ha enviado un link a su correo para restablecer la contraseña',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }
    else{
      const alert = await this.alertController.create({
        header: 'Aviso!',
        subHeader: 'Correo incorrecto',
        message: 'El correo que ingresaste es incorrecto',
        buttons: ['Aceptar'],
      });

      await alert.present();
      
    }
    
  }

  


  

}



