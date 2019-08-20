import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addreference',
  templateUrl: './addreference.page.html',
  styleUrls: ['./addreference.page.scss'],
})
export class AddreferencePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addfref(ref){
    console.log(document.getElementById("ref").nodeValue);
  }

}
