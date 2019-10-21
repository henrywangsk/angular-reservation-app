import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080';
  private reversationUrl = `${this.baseUrl}/room/v1/reservations/`;

  createReservtion(body: ReservationRequest): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Reservation>(this.reversationUrl, body, httpOptions);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reversationUrl);
  }
}

export class ReservationRequest {
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  price: number;

  constructor(roomNumber: number, checkIn: string, checkOut: string, price: number) {
    this.roomNumber = roomNumber;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.price = price;
  }
}

export interface Reservation {
  id: string;
  roomNumber: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
}
