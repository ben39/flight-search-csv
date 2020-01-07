import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'flight-table';

  filteredFlights: any;
  isLoading = false;
  errorMsg: string;
 
  constructor(private http: HttpClient) { }
 
  ngOnInit() { }
  
  
}
