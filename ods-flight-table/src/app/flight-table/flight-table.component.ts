import { Component, OnInit } from '@angular/core';
import { FlightService } from "../flight.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.css']
})
export class FlightTableComponent implements OnInit {

  origin = new FormControl();
  destination = new FormControl();

  constructor(private svc: FlightService, private http: HttpClient) { 
    this.origin.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.suggestedOrigins = [];
        this.suggestedDestinations = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.post("http://localhost:5000/api/v1/station",{search: value})
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      this.suggestedOrigins = data;
    });

    this.destination.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = "";
        this.suggestedOrigins = [];
        this.suggestedDestinations = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.post("http://localhost:5000/api/v1/station",{search: value, isDestinationQuery: true})
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      this.suggestedDestinations = data;
    });
  }


  private flightData;
  private flights;
  private isSearched = false;
  private suggestedOrigins;
  private suggestedDestinations;

  private isLoading;
  private errorMsg;
  private columns;


  ngOnInit() {}

  getHeader(){
    return Object.keys(this.flightData[0]);
  }

  searchFlights() {
    this.isLoading = true;
    this.http.post("http://localhost:5000/api/v1/flight", {
      origin: this.origin.value,
      destination: this.destination.value
    },{responseType: 'text'}).subscribe(res => {
      this.isSearched = true;
      this.errorMsg = "";
      this.flightData = JSON.parse(res);
      if(this.flightData.length) {
        this.flights = Object.keys(this.flightData[0]);
        this.columns = this.flights.slice();
      }
      this.isLoading = false;
    }, err => {
      this.errorMsg = JSON.parse(err.error.toString()).error;
      this.isLoading = false;
    })
  }

}