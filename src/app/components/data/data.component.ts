import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {

  forma:FormGroup;

  usuario:any = {
    nombreCompleto:{
      nombre:"Mariano",
      apellido:"Lopez"
    },
    correo:""
  }

  constructor() {

    this.forma = new FormGroup ( {

      'nombreCompleto':new FormGroup ( {
        'nombre': new FormControl( '' , [
                                        Validators.required,
                                        Validators.minLength(3) ] ),
        'apellido': new FormControl( '' ,Validators.required )
      }),
      'correo': new FormControl(  '', [
                                    Validators.required,
                                    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ] ),

      'pasatiempos': new FormArray ([
        new FormControl ('correr', Validators.required)
      ])

    } )


    //this.forma.setValue (this.usuario);

  }

  ngOnInit() {
  }

  public guardarCambios() {
    console.log (this.forma.value);
//    this.forma.reset (this.usuario);


    this.forma.reset ({
      nombreCompleto:{
        nombre:"",
        apellido:""
      },
      correo:""
    });
  }

  public agregarPasatiempo () {
    (<FormArray>this.forma.controls['pasatiempos']).push (
      new FormControl ('', Validators.required)
    )
  }



}
