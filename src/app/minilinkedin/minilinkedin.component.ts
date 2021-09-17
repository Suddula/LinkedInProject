import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { LinkedinServiceService } from '../linkedin-service.service';
import { LinkedInList,LinkedinPost } from '../models/linkedin';

@Component({
  selector: 'app-minilinkedin',
  templateUrl: './minilinkedin.component.html',
  styleUrls: ['./minilinkedin.component.css']
})
export class MinilinkedinComponent implements OnInit {
  // linkedInForm:FormGroup;
  // linkedIdData: any;
  linkedIdData:Array<LinkedInList>;
  objLinkedInData:LinkedinPost= new LinkedinPost();
  isPostmsg: boolean=false;
  previewImage: string='';
  linkedInForm: FormGroup;
  percentDone: any = 0;
  submitted: boolean =false;
  
  // public get contentControl(): AbstractControl | null {
  //   return this.linkedInForm.get('inputText');
  // }

  constructor(
    // private readonly fb:FormBuilder,
    public readonly linkedInService:LinkedinServiceService,
    public readonly routes:ActivatedRoute,
    public fb: FormBuilder,
  ) { 
    this.linkedIdData =new Array<LinkedInList>();
    this.linkedInForm = this.fb.group({
      inputText: ['',[Validators.required]],
      ImageBase64: [null]
    })
  }

  ngOnInit(): void {
    this.routes.data.subscribe(linkedIdDataList=>{
      console.log("linkedIdDataList",linkedIdDataList);
      this.linkedIdData = linkedIdDataList.linkedIdData as Array<LinkedInList>;
    })
  
    // this.getAllLinkedIn();
    // this.linkedInService.getAllLinkedins();
    // this.linkedInService.getAllLinkedins().subscribe(data => {
    //   this.linkedIdData = data
    // });   
  }
// Useing Observable
  public getAllLinkedIn(){
     this.linkedInService.getAllLinkedins()
      .subscribe(data => this.linkedIdData = data);
  }

// Useing Promises
 async getAllLinkedIn2(){
    await this.linkedInService.getAllLinkedinsAnsyc().then(data=>{
      this.linkedIdData =data;
    });
  }
 

  NewLinkedIn():void{
    this.objLinkedInData= new LinkedinPost();
    this.previewImage ='';
    this.linkedInForm.controls["inputText"].setValue('');
    this.linkedInForm.controls['ImageBase64'].setValue('');

  }
  IsProperName(value : string) : boolean{ 
    let re  = new RegExp('^[A-Z][a-z]+\\s[A-Z][a-z]+');
    return re.test(value);
  }
  
 
  SaveData():void {
     // first way writen Api call
     this.submitted = true;

      if (this.linkedInForm.invalid) {
            this.findInvalidField();
            return;
        }

      const postModel = new LinkedinPost();
      postModel.inputText = this.linkedInForm.controls["inputText"].value;
      postModel.ImageBase64 = this.previewImage;
      this.linkedInService.postLinkedin(postModel).subscribe(result=>{
        this.linkedInService.getAllLinkedins().subscribe(list=>{
          this.linkedIdData = list;
          this.submitted = false;
        });
        this.isPostmsg = false;
        this.NewLinkedIn();
      });

  }
  findInvalidField() {
  
    const invalid = [];
    const controls = this.linkedInForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    console.log("INVALID CONROLS", invalid);
  }
  uploadFile(event:any) {

    const fileControl = event.target as HTMLInputElement;
    if (!fileControl || !fileControl.files || fileControl.files.length<=0) {
      return;
    }

    const file = fileControl.files[0];
    
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
 // Second way writen Api call
    // this.linkedInService.postLinkedin(this.objLinkedInData)
    //     .subscribe(async (result) => {
    //       (await this.linkedInService.getAllLinkedins()).subscribe(linkedinList=>{
    //       this.linkedIdData = linkedinList
    //       })
    //       this.objLinkedInData.inputText = '';
    //     });


  //  public async getAllLinkedIn1(){
  //   await this.linkedInService.getAllLinkedins()
  //     .subscribe(data => this.linkedIdData = data);
  // }

}
