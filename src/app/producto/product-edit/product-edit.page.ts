import { Component, OnInit } from '@angular/core';

// Imporamos librerías
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  // FormGroup para validaciones
  productForm!: FormGroup;
  // Esquema a utilizar en el Html
  producto: ClProducto = { idProducto: 0, codigo: 'AIDAPP', nombreprod: '0', precio: 0,cantidad:0, fechaNacimiento: new Date(), rut: 0, dv: '0', enfermedad: '0', fonocontacto: 0, categoria: '0', editorial: '0', raza:'0', edad: 0, altura: 0, hrini: '0', hrfin: '0', direccion: '0', fCreacion: new Date() };
  idProducto: any = '';
  //prod_name: string = '';
  //prod_desc: string = '';
  //prod_price:number=null;
  //prod_cantidad:number=null

  // Injectamos librerías
  constructor(public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['idProducto']);
    // Relizamos lectura
    this.getProduct(this.route.snapshot.params['id']);
    // Especificamos Validaciones por medio de FormGroup
    this.productForm = this.formBuilder.group({
      'prod_categoria': [null, Validators.required],
      'prod_nombreprod': [null, Validators.required],
      'prod_fCreacion': [null, Validators.required],
      
    });
  }
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit ID:" + this.idProducto)
    this.producto.idProducto = this.idProducto;
    /*this.producto.nombre = form.prod_name;
    this.producto.descripcion = form.prod_desc;
    this.producto.precio = form.prod_price;
    this.producto.cantidad = form.prod_cantidad;
    */
    // si envio form, envio los nombres del campo del formulario
    //await this.restApi.updateProduct(this.id, form)
    await this.restApi.updateProduct(this.idProducto, this.producto)
      .subscribe({
        next: (res) => {
          let id = res['idProducto'];
          //this.router.navigate([ 'detail', { outlets: { details: id }} ]);
          this.router.navigate(['/product-detail/' + this.idProducto]);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

  }

  // Método que permite leer el producto
  async getProduct(idProducto: number) {
    // Crea Wait
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      // Muestra Wait
      await loading.present();
      // Obtiene el Observable
      await this.restApi.getProduct(idProducto)
        .subscribe({
          next: (data) => {
            console.log("getProductID data****");
            console.log(data);
            // Si funciona Rescata el los datos
            this.idProducto = data.idProducto;
            // Actualiza los datos
            this.productForm.setValue({
              prod_categoria: data.categoria,
              prod_nombreprod: data.nombreprod,
              prod_fCreacion: data.fCreacion,
             
            });
            loading.dismiss();
          }
          , complete: () => { }
          , error: (err) => {
            console.log("getProductID Errr****+");
            console.log(err);
            loading.dismiss();
          }
        })
    }
  

 // Método que actualiza el producto por medio de submit
  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            //Si funciona el actualizar navega a listar
            this.router.navigate(['/product-list/']);
          }
        }
      ]
    });
    await alert.present();
  }

}
