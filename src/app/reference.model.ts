import { HttpClient } from '@angular/common/http';

export class Reference {

    public httpclient:HttpClient;

    
    constructor(public designation:string,
                public type:string,
                public lat:string,
                public lng:string,
                public cote:string,
                public id?: string,
                ){
 
    }

  


 
}