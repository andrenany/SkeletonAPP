import { Component } from '@angular/core';
import { Router } from '@angular/router';//importamos el modulo para trabajar rutas de angular
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: any;
  formulario: FormGroup;
  showCalendar: boolean = false;


  constructor(public fb: FormBuilder, private router: Router, public alertController: AlertController ) { 
    
    
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nivelEducacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]});
      this.usuario = localStorage.getItem('f.usuario'); 
  }

  ngOnInit() {
     // Llamamos a la función que obtiene el usuario del localStorage
     this.usuario = this.getUsuarioFromLocalStorage();
  }
  limpiar() {
    this.formulario.reset();
  }
  navigateTologin(){
    this.router.navigate(['/login']);//con esta linea navegamos hacia la página del detalle
  }
  
  // Función para obtener los datos del usuario desde el localStorage
  getUsuarioFromLocalStorage() {
    const usuarioString = localStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }



  async mostrar() {
    const formData = this.formulario.value;

    const alert = await this.alertController.create({
      header: 'Datos Ingresados',
      message: `Nombre: ${formData.nombre}\nApellido: ${formData.apellido}\nNivel Educación: ${formData.nivelEducacion}\nFecha Nacimiento: ${formData.fechaNacimiento}`,
      buttons: ['Aceptar']
    });
    

    await alert.present();
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar; // Alterna la visibilidad del calendario
  }
}

