import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }


    `]
})
export class TemplateComponent implements OnInit {

  usuario:object = {
    nombre: null,
    apellido: null,
    correo: null


  }

  constructor(  ) { }

  ngOnInit() {
  }

  guardar ( forma:NgForm ) {
    console.log("guardando");
    console.log("ngForm", forma);
    console.log("value", forma.value);

    console.log(this.usuario);
  }

}