import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  invalidValue: boolean = true;
  characters: [string, number][] = [];
  showTable: boolean = false;
  characterForm!:FormGroup

  constructor(private formBuilder:FormBuilder){}

ngOnInit(){

  this.characterForm=this.formBuilder.group({
    input:['',[Validators.required,Validators.pattern('[0-9a-zA-Z ]*')]]
  })

}
  countChars() {
    if(this.characterForm.invalid){
      return
    }
    let counts: { [key: string]: number } = {};
    for (let i = 0; i < this.characterForm.value.input.length; i++) {
      let char = this.characterForm.value.input.charAt(i);
      if (counts[char]) {
        counts[char]++;
      } else {
        counts[char] = 1;
      }
    }
    Object.keys(counts).forEach((key) => {
      if (key == ' ') {
        delete counts[key];
      }
    });
    this.characters = Object.entries(counts);
    this.showTable = true;
  }
  get characterFormControls(){
    return this.characterForm.controls
  }
}
