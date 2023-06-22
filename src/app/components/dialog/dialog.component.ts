import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Departamento } from '../../Interfaces/departamento';
import { Empleado } from '../../Interfaces/empleado';
import { DepartamentoService } from '../../Services/departamento.service';
import { EmpleadoService } from '../../Services/empleado.service';

export const MY_DATE_FORMATS ={
  parse:{
    dateInput:'DD/MM/YYYY',
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers:[
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DialogComponent implements OnInit {

  formEmpleado: FormGroup;
  titulo_accion: string = "Nuevo";
  boton_accion: string = "Guaradar";
  listaDepartamentos: Departamento[]=[];

  constructor(
    private dialogoRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private departamentoService: DepartamentoService,
    private empleadoService: EmpleadoService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado:Empleado
    
  ) {
    
    this.formEmpleado = this.formBuilder.group({
      nombreCompleto:['', Validators.required],
      idDepartamento:['', Validators.required],
      sueldo:['', Validators.required],
      fechaContrato:['', Validators.required]
    })

    this.departamentoService.getList()
    .subscribe({
      next:(data) =>{
        console.log('Data Departamentos: ' + data);
        this.listaDepartamentos = data;
      }, error(e){}
    })
   }

  ngOnInit(): void {
    if(this.dataEmpleado){
      this.formEmpleado.patchValue({
        nombreCompleto:this.dataEmpleado.nombreCompleto,
        idDepartamento:this.dataEmpleado.idDepartamento,
        sueldo:this.dataEmpleado.sueldo,
        fechaContrato:moment(this.dataEmpleado.fechaContrato,"DD/MM/YYYY")
      })

      this.titulo_accion = "Editar",
      this.boton_accion = "Actualizar"
    }
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    })
  }

  addEditEmpleado(){
   const modelo:Empleado ={
    idEmpleado:0,
    nombreCompleto:this.formEmpleado.value.nombreCompleto,
    idDepartamento:this.formEmpleado.value.idDepartamento,
    sueldo:this.formEmpleado.value.sueldo,
    fechaContrato:moment(this.formEmpleado.value.fechaContrato).format("DD/MM/YYYY")
   }

   if(this.dataEmpleado == null){
    this.empleadoService.add(modelo).subscribe({
      next:(data) =>{
        this.mostrarAlerta("Empleado creado con exito! ","Listo")
        this.dialogoRef.close("creado")
      }, error:(e)=>{
        this.mostrarAlerta("Error al crear empleado! ","Error")
      }
     })
   }else{
    this.empleadoService.update(this.dataEmpleado.idEmpleado, modelo)
    .subscribe({
      next:(data) =>{
        this.mostrarAlerta("Empleado editado con exito! ","Listo")
        this.dialogoRef.close("editado")
      }, error:(e)=>{
        this.mostrarAlerta("Error al editar empleado! ","Error")
      }
     })
   }

  }

}
