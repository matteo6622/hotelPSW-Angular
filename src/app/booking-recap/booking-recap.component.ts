import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { Room } from '../model/room';
import { RoomService } from '../service/room.service';

@Component({
  standalone: true,
  selector: 'app-booking-recap',
  templateUrl: './booking-recap.component.html',
  styleUrls: ['./booking-recap.component.css'],
  imports: [CardModule, CommonModule, TableModule, ReactiveFormsModule]
})
export class BookingRecapComponent implements OnInit {
  styleCard = {'background': 'limegreen'};
  confirmString: string = '';
  booking!: Booking;
  room!: Room;
  totalPrice!: number;
  checkInDate!: Date;
  checkOutDate!: Date;
  start!: number;
  finish!: number;
  timeDifference!: number;
  numGuest!: number;

  constructor(private router: Router, private aRouter: ActivatedRoute, 
    private bookingService: BookingService, private roomService: RoomService) {
      
   }

  ngOnInit() {
    this.confirmString = this.aRouter.snapshot.params['code'];
    this.bookingService.getBookingByConfirmationCode(this.confirmString).subscribe((res) => {
          this.booking = new Booking(res['checkIn'], res['checkOut'], res['guestName'], res['guestEmail'],
          res['numberOfGuest']);
          console.log(this.booking);
          this.numGuest = this.booking.numberOfGuest;
          console.log(this.numGuest);
          this.checkInDate = new Date(res.checkIn);
          this.checkOutDate = new Date(res.checkOut);
          this.start = Date.UTC(this.checkInDate.getFullYear(), this.checkInDate.getMonth(),
          this.checkInDate.getDate());
          this.finish = Date.UTC(this.checkOutDate.getFullYear(), this.checkOutDate.getMonth(),
          this.checkOutDate.getDate());
          this.timeDifference = Math.abs((this.start - this.finish) /
          (1000* 3600* 24));
          console.log(this.timeDifference);
          this.roomService.getRoom(this.aRouter.snapshot.params['id']).subscribe((res) => {
            this.room = new Room(res['name'], res['description'], res['price'], res['roomType'],
             res['services']);
          this.totalPrice = (this.room.price * this.numGuest) * this.timeDifference;
          console.log(this.totalPrice);       
    });
  });
        
  }

}
