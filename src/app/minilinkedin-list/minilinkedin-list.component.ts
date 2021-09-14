import { Component, OnInit,Input } from '@angular/core';
import { LinkedinServiceService } from '../linkedin-service.service';
import { LinkedInList,LinkedInComments,LinkedInLike } from '../models/linkedin';

@Component({
  selector: 'app-minilinkedin-list',
  templateUrl: './minilinkedin-list.component.html',
  styleUrls: ['./minilinkedin-list.component.css']
})
export class MinilinkedinListComponent implements OnInit {

  @Input()linkedInList:any;
  currentIndex: number;
  likesLinkedin:LinkedInLike= new LinkedInLike();
  linkedInCommentsData:LinkedInComments = new LinkedInComments();
  comments: string;
  liked: boolean = false;
  highlightTrue: boolean= false;
  likeCount:number =0;
  isComments: boolean=false;
  constructor(
    public readonly linkedInService:LinkedinServiceService,
  ) {

    this.comments ='';
    this.currentIndex = 0;
   }

  ngOnInit(): void {
  }
  showComments(index:number){
    this.currentIndex = index;
  }

  // Saveing Likes
  SaveLinke(i:number | undefined,id:number |undefined,liked:any):void{
    this.liked = !liked;
    if(this.liked){
      this.highlightTrue =true;
      this.likesLinkedin.liked= true;
    }else{
      this.highlightTrue =false;
      this.likesLinkedin.liked =false;
    }
    this.linkedInService.postLinkedinLikes(id,this.likesLinkedin).subscribe(result=>{
      this.linkedInService.getAllLinkedins().subscribe(list=>{
        this.linkedInList =list
        // this.likeCount = this.linkedInList.indexOf(this.likesLinkedin);
      })
    });
  }
  SaveComments(commtForm:any,i:number|undefined,id:number|undefined):void{
    console.log('commtForm',commtForm.form.valid);
    if(commtForm.form.valid){
      this.linkedInService.postLinkedinComments(id,this.linkedInCommentsData).subscribe(result=>{
        this.linkedInService.getAllLinkedins().subscribe(commentsList=>{
          this.linkedInList =commentsList;
        })
        this.isComments = false;
        this.linkedInCommentsData.comments ="";
      });
      }else{
      this.isComments = true;
      return;
    }
   
  }
  deleteLinked(i:number|undefined,id:number|undefined):void{
    this.linkedInService.deletLinkedin(id).subscribe(result=>{
      this.linkedInService.getAllLinkedins().subscribe(
        data=>{
          this.linkedInList = data;
        }
      )
    })

  }
  
  deletLinkedinComments(i:number|undefined,id:number|undefined):void{
    this.linkedInService.deletLinkedinComments(id).subscribe(result=>{
      this.linkedInService.getAllLinkedins().subscribe(
        data=>{
          this.linkedInList = data;
        }
      )
    })

  }

}
