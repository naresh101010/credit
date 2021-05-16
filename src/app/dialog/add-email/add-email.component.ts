import { Component, Inject, HostListener, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatChipInputEvent } from "@angular/material";
import { ToastrService } from "ngx-toastr";
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})

export class  AddEmailComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddEmailComponent>,
    public dialog: MatDialog, public tosterService:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    communicationemailList=[];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    visible = true;
    

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeDialog(): void {
    this.dialogRef.close();
    // const dialogRefConfirm = this.dialog.open(confimationdialog, {
    //   width: '300px',
    //   data:{message:'Are you sure ?'},
    //   panelClass: 'creditDialog',
    //   disableClose: true,
    //   backdropClass: 'backdropBackground'
    // });

    // dialogRefConfirm.afterClosed().subscribe(value => {
    //   if(value){
    //     this.dialogRef.close();
    //   }else{
    //     console.log('Keep Open');
    //   }
    // });
    
  }

  ngOnInit() {
    console.log(this.data)
    // if (this.data.communicationemailList) {
    //   this.data.communicationemailList.forEach(element => {
    //     if(element.trim()!=='') {
    //     this.communicationemailList.push(element);
    //   }});
    //   console.log(this.communicationemailList);
    // }
  }

  communicationEmail() {
    console.log(this.data,'this.data')
    this.data = this.communicationemailList;
    this.dialogRef.close(this.data);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let regex = /^[A-Za-z_0-9.]{2,}@([A-Za-z0-9]{1,}[.]{1}[A-Za-z]{2,20}|[A-Za-z0-9]{1,}[.][A-Za-z]{2,20}[.]{1}[A-Za-z]{2,20})$/g;
    let allList = value.split(',');
    let invalidList = [];
    allList.forEach(data => {
      if ((data || '').trim() && data.match(regex) && !this.communicationemailList.includes(data)) {
        this.communicationemailList.push(data);
      } else if (data.trim() && !data.match(regex)) {
        invalidList.push(data)
      }
    });
    if (invalidList && invalidList.length > 0) {
      this.tosterService.error("Invalid mail id's " + invalidList.toString() + " . Please provide a valid email.");
    }
    if (input) {
      input.value = '';
    }
  }

  remove(mail:string): void {
    const index = this.communicationemailList.indexOf(mail);

    if (index >= 0) {
      this.communicationemailList.splice(index, 1);
    }
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) { // esc [Close Dialog]
        event.preventDefault();
        if(document.getElementById('closeButton')){
          let escElement = document.getElementById('closeButton');
          escElement.click();
        }
      }
  }

}