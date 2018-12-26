import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs';


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
        'apellido': new FormControl( '' , [Validators.required, this.noHerrera] )
      }),
      'correo': new FormControl(  '', [
                                    Validators.required,
                                    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ] ),

      'pasatiempos': new FormArray ([
        new FormControl ('correr', Validators.required)
      ]),

      'username': new FormControl(  '', [Validators.required], this.existeUsuario ),
      'password1': new FormControl(  '', [Validators.required] ),
      'password2': new FormControl()


    } )


    //this.forma.setValue (this.usuario);

    //Validador de forma dinámica y el bind es para indicar el this dentro de la funcion
    this.forma.controls['password2'].setValidators ( [Validators.required, this.noIgual.bind ( this.forma )]   )

    this.forma.controls['username'].valueChanges.subscribe ( data => {
      console.log (data);
    }  )

    this.forma.controls['username'].statusChanges.subscribe ( data => {
      console.log (data);
    }  )



  }

  ngOnInit() {
  }

  public guardarCambios() {
    console.log (this.forma.value);
//    this.forma.reset (this.usuario);
    // this.forma.reset ({
    //   nombreCompleto:{
    //     nombre:"",
    //     apellido:""
    //   },
    //   correo:""
    // });
  }

  public agregarPasatiempo () {
    (<FormArray>this.forma.controls['pasatiempos']).push (
      new FormControl ('', Validators.required)
    )
  }

  public noHerrera ( control:FormControl ): { [s:string]:boolean }  {

    if ( control.value === "Herrera" ) {
      return { noherrera:true};
    }

    return null;

  }

  public noIgual ( control:FormControl ): { [s:string]:boolean }  {

    let forma:any = this;

    if ( control.value !== forma.controls['password1'].value ) {
      return { noiguales:true};
    }

    return null;

  }


  public existeUsuario ( control:FormControl ):  Promise<any>|Observable<any> {
    let promesa = new Promise (
      (resolve, reject) => {
        setTimeout ( ()=> {

          if ( control.value === "strider" ) {
            resolve ( {existe:true} );
          } else {
            resolve ( null );
          }
        },3000)
      }
    )
    return promesa;


  }







}
