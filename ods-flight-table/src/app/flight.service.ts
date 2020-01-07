import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class FlightService {

  url: string
  constructor(private http: HttpClient) {
   }
}
