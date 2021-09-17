export class LinkedInList{
    public id:number | undefined;
    public inputText:string ="";
    public createdOn:Date =new Date();
    public linkedInComments:LinkedInComments | undefined;
    public linkedInLikes:LinkedInLike | undefined;
    public highlightTrue:boolean =false;
    public imageBase64:string |undefined;
}
export class LinkedinPost {
    public inputText:string ="";
    public ImageBase64:string ='';
}
export class LinkedInComments {
    public id:number | undefined;
    public postId:number | undefined;
    public comments:string ="";
    public createdOn:Date =new Date();
}

export class LinkedInLike{
    public liked :boolean =false;
}