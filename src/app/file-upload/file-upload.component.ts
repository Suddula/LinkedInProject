import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadServicesService } from './../file-upload-services.service'
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { LinkedInList, LinkedinPost } from '../models/linkedin';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  preview: string='';
  form: FormGroup;
  percentDone: any = 0;
  users = [];
  linkedInService: any;
  linkedIdData: Array<LinkedInList>= new Array<LinkedInList>();
  objLinkedInData:LinkedinPost= new LinkedinPost();
  postImage: string ='';

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadServicesService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: [''],
      avatar: [null]
    })
  }

  ngOnInit() { }



  // Image Preview

 

  uploadFile(event:any) {

    const fileControl = event.target as HTMLInputElement;
    if (!fileControl || !fileControl.files || fileControl.files.length<=0) {
      return;
    }

    const file = fileControl.files[0];
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.postImage = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
  public getAllLinkedIn(){
    this.linkedInService.getAllLinkedins()
     .subscribe((data: LinkedInList[]) => this.linkedIdData = data);
 }
  submitForm(linkedInForm:any):void {
    // first way writen Api call
    // if(!linkedInForm.form.valid){
    //   // this.isPostmsg = true;
    //    return;
    // }else{
      // postModel.imageBase64 = this.postImage;
      this.objLinkedInData.inputText= this.form.value.name;
      this.objLinkedInData.ImageBase64 = this.form.value.avatar;
      this.objLinkedInData.ImageBase64 = this.postImage;
      this.fileUploadService.addUser(
      this.objLinkedInData
      ).subscribe(result=>{
       this.linkedInService.getAllLinkedins().subscribe((list: LinkedInList[])=>{
         this.linkedIdData = list;
       });
      // this.isPostmsg = false;
      //  this.NewLinkedIn();
     });
   // }
 }

  // submitForm() {
  //   this.fileUploadService.addUser(
  //     this.form.value.name,
  //     this.form.value.avatar
  //   ).subscribe((event: HttpEvent<any>) => {
  //     switch (event.type) {
  //       case HttpEventType.Sent:
  //         console.log('Request has been made!');
  //         break;
  //       case HttpEventType.ResponseHeader:
  //         console.log('Response header has been received!');
  //         break;
  //       case HttpEventType.UploadProgress:
  //         // this.percentDone = Math.round(event.loaded / event.total * 100);
  //         console.log(`Uploaded! ${this.percentDone}%`);
  //         break;
  //       case HttpEventType.Response:
  //         console.log('User successfully created!', event.body);
  //         this.percentDone = false;
  //         this.router.navigate(['users-list'])
  //     }
  //   })
  // }


}
