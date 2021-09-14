import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  constructor(
    // private readonly fb:FormBuilder,
    public readonly linkedInService:LinkedinServiceService,
    public readonly routes:ActivatedRoute
  ) { 
    this.linkedIdData =new Array<LinkedInList>();
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
  }
  IsProperName(value : string) : boolean{ 
    let re  = new RegExp('^[A-Z][a-z]+\\s[A-Z][a-z]+');
    return re.test(value);
  }
  SaveData(linkedInForm:any):void {
     // first way writen Api call
     if(!linkedInForm.form.valid){
       this.isPostmsg = true;
        return;
     }else{
      this.linkedInService.postLinkedin(this.objLinkedInData).subscribe(result=>{
        this.linkedInService.getAllLinkedins().subscribe(list=>{
          this.linkedIdData = list;
        });
        this.isPostmsg = false;
        this.NewLinkedIn();
      });
     }
  }
 // Second way writen Api call
    // this.linkedInService.postLinkedin(this.objLinkedInData)
    //     .subscribe(async (result) => {
    //       (await this.linkedInService.getAllLinkedins()).subscribe(linkedinList=>{
    //       this.linkedIdData = linkedinList
    //       })
    //       this.objLinkedInData.inputText = '';
    //     });


   public async getAllLinkedIn1(){
    await this.linkedInService.getAllLinkedins()
      .subscribe(data => this.linkedIdData = data);
  }

}
