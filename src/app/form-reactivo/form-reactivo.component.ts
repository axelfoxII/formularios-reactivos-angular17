import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactivo',
  standalone: true, // Indica que este componente es autónomo y no necesita un módulo
  imports: [ReactiveFormsModule, CommonModule], // Módulos necesarios para el formulario reactivo
  templateUrl: './form-reactivo.component.html', // Ruta del template (HTML) del componente
  styleUrl: './form-reactivo.component.css' // Ruta del archivo de estilos CSS del componente
})
export class FormReactivoComponent implements OnInit {
  
  // Inyección del servicio FormBuilder para crear y gestionar formularios reactivos
  private fb = inject(FormBuilder);
  
  // Definición de la variable que contendrá el formulario (FormGroup)
  public forma!: FormGroup;  

  ngOnInit() {
    // Método que se ejecuta al inicializar el componente, y crea el formulario
    this.crearFormulario(); 
  }

  // Getter para validar si el campo 'nombre' es inválido y ha sido tocado por el usuario
  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  // Getter para validar si el campo 'apellido' es inválido y ha sido tocado
  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }

  // Getter para validar si el campo 'correo' es inválido y ha sido tocado
  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  // Getter para validar si el campo 'password1' es inválido y ha sido tocado
  get password1NoValido() {
    return this.forma.get('password1')?.invalid && this.forma.get('password1')?.touched;
  }

  // Getter para validar si el campo 'password2' es inválido y ha sido tocado
  get password2NoValido() {
    return this.forma.get('password2')?.invalid && this.forma.get('password2')?.touched;
  }

  // Método que crea el formulario con sus validaciones
  crearFormulario() {
    // Se usa FormBuilder para crear el formulario con campos y validadores
    this.forma = this.fb.group({
      nombre: ['', Validators.required], // Campo 'nombre' es obligatorio
      apellido: ['', Validators.required], // Campo 'apellido' es obligatorio
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]], // Campo 'correo' requiere patrón de email
      password1: ['', [Validators.required, Validators.minLength(6)]], // 'password1' es obligatorio y mínimo de 6 caracteres
      password2: ['', Validators.required] // 'password2' es obligatorio
    }, { 
      validators: this.passwordIguales('password1', 'password2') // Validador personalizado para verificar que las contraseñas coinciden
    });
  }
  
  // Método que se ejecuta al intentar guardar el formulario
  guardar() {
    this.passNoValido(); // Verificación de si las contraseñas coinciden

    // Si el formulario es inválido, marca todos los campos como tocados
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched(); // Marca cada control como tocado para mostrar los mensajes de error
      });
      
    }
  }

  // Método para verificar si las contraseñas no coinciden
  passNoValido() {
    const pass1 = this.forma.get('password1')?.value;
    const pass2 = this.forma.get('password2')?.value;

    // Retorna true si las contraseñas no coinciden
    if (pass1 !== pass2) {
      return true;
    } else {
      return false;
    }
  }

  // Validador personalizado para comprobar que dos contraseñas son iguales
  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      // Si las contraseñas coinciden, elimina el error de 'password2'
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        // Si no coinciden, establece el error 'noEsIgual' en 'password2'
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
