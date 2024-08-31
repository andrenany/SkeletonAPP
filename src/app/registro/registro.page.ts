import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//importamos el modulo para trabajar rutas de angular
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup
  constructor(private router: Router, public fb:FormBuilder, public alertController: AlertController  ) { 
    this.registroForm = this.fb.group({
      'usuario': new FormControl("",[Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      'password': new FormControl("",[Validators.required, Validators.pattern(/^\d{4}$/)]),
      'confirmacionPassword': new FormControl("",[Validators.required, Validators.pattern(/^\d{4}$/)])
    })

  }


  navigateTologin(){
    this.router.navigate(['/login']);//con esta linea navegamos hacia la página del detalle 
  }

  ngOnInit() {
  }

   async guardar(){
    var f = this.registroForm.value;

    if(this.registroForm.invalid){
      const alert = await this.alertController.create({
      header: 'Datos incompletos',
       message: 'Tienes que llenar todos los datos',
       buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    var usuario={
      usuario: f.usuario,
      password: f.password
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    // Mostrar mensaje de éxito antes de navegar
    const successAlert = await this.alertController.create({
      header: 'Cuenta creada',
      message: 'Tu cuenta fue creada con éxito.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          // Navegamos a la página de login después de que el usuario cierre el alerta
          this.router.navigate(['/login']);
        }
      }]
    });

    await successAlert.present();
  }

}
