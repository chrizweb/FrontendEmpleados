import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from '../../Interfaces/empleado';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private dialogoRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado:Empleado
  ) { }

  ngOnInit(): void {
  }

  confirmarEliminado(){
    if(this.dataEmpleado){
      this.dialogoRef.close("eliminar")
    }
  }

}
