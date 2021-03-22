import { Component, OnInit,Inject, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { confimationdialog } from '../confirmationdialog/confimationdialog';


@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.css']
})
export class EmailPreviewComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EmailPreviewComponent>, 
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private tosterservice: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  bdmEmail:string=""

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.bdmEmail = this.data.email;
  }

  emailAddress(){
    this.data = this.bdmEmail.toUpperCase();
    this.spinner.show();
    this.dialogRef.close(this.data);
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let escElement   = document.getElementById('closeButton')  ;
          escElement.click();
        }
      }
  }

  closeDialog(): void {
      
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close(false);
      }else{
        console.log('Keep Open');
      }
    });

  }
}
