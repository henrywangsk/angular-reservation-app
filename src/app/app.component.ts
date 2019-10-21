import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationService, ReservationRequest, Reservation } from './reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reservation-app';

  constructor(private reservationService: ReservationService) {}

  rooms: Room[];
  roomSearchForm: FormGroup;
  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;
  currentReservations: Reservation[];

  ngOnInit() {
    this.roomSearchForm = new FormGroup({
      checkIn: new FormControl(''),
      checkOut: new FormControl(''),
      roomNumber: new FormControl('')
    });

    this.roomSearchForm.valueChanges.subscribe(form => {
      this.currentCheckInVal = form.checkIn;
      this.currentCheckOutVal = form.checkOut;
      if (form.roomNumber) {
        const roomVals: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomVals[0]);
        this.currentPrice = Number(roomVals[1]);
      }
      console.log(this.currentCheckInVal);
      console.log(this.currentCheckOutVal);
      console.log(form.roomNumber);
      console.log(this.currentRoomNumber);
      console.log(this.currentPrice);
    });

    this.rooms = [
      new Room('127', '127', '150'),
      new Room('138', '138', '140'),
      new Room('155', '155', '180')
    ];

    this.getCurrentReservations();
  }

  createReservation() {
    this.reservationService.createReservtion(
      new ReservationRequest(
        this.currentRoomNumber,
        this.currentCheckInVal,
        this.currentCheckOutVal,
        this.currentPrice
      )
    ).subscribe (postResult => {
      console.log(postResult);
      this.getCurrentReservations();
    });
  }

  getCurrentReservations() {
    this.reservationService.getReservations().subscribe(getResult => {
      console.log(getResult);
      this.currentReservations = getResult;
    });
  }
}

export class Room {
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }
}
