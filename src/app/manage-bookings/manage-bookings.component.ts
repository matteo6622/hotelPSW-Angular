import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TrashIcon } from 'primeng/icons/trash';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Booking } from '../model/booking';
import { BookingService } from '../service/booking.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  standalone: true,
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css'],
  imports: [TableModule, ButtonModule, TagModule, CurrencyPipe, TrashIcon, DropdownModule, FormsModule,
    CommonModule, CalendarModule
  ]
})
export class ManageBookingsComponent implements OnInit {

  bookings!: Booking[];
  checkInDate!: Date;
  checkOutDate!: Date;
  start!: number;
  finish!: number;
  timeDifference!: number;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getAllBookings().subscribe((res) => {
      for(let b in res) {
        this.checkInDate = new Date(res[b].checkIn);
        this.checkOutDate = new Date(res[b].checkOut);
        this.start = Date.UTC(this.checkInDate.getFullYear(), this.checkInDate.getMonth(),
          this.checkInDate.getDate());
        this.finish = Date.UTC(this.checkOutDate.getFullYear(), this.checkOutDate.getMonth(),
          this.checkOutDate.getDate());
        this.timeDifference = Math.abs((this.start - this.finish) /
          (1000* 3600* 24));
        res[b].numberOfDays = this.timeDifference;
      }
      this.bookings = res;
    });
  }

  deleteBooking(bookId: number) {
    this.bookingService.deleteBooking(bookId).subscribe();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

}
