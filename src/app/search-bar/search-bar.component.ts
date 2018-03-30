import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  search:string = "";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(query){
    this.router.navigate(["/search", {"search": query.toLowerCase()}])
  }

}
