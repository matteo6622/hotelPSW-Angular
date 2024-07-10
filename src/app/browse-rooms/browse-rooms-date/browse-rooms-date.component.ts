import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../model/room';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TrashIcon } from 'primeng/icons/trash';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-browse-rooms-date',
  templateUrl: './browse-rooms-date.component.html',
  styleUrls: ['./browse-rooms-date.component.css'],
  imports: [TableModule, ButtonModule, TagModule, CurrencyPipe, TrashIcon, DropdownModule, FormsModule,
    CommonModule, MatFormFieldModule, MatDatepickerModule, CalendarModule, ToastModule]
})
export class BrowseRoomsDateComponent implements OnInit {
  availableRooms!: Room[];
  type!: String[];
  services!: String[];
  checkIn!: Date;
  checkOut!: Date;

  constructor(private roomService: RoomService, private router:Router,
    private aRouter: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.roomService.getAvailableRooms(this.aRouter.snapshot.params['checkIn'],
    this.aRouter.snapshot.params['checkOut']).subscribe((res) => {
      this.availableRooms = res;
      console.log(this.availableRooms);
    });
    this.checkIn = this.aRouter.snapshot.params['checkIn'];
    this.checkOut = this.aRouter.snapshot.params['checkOut'];
    this.roomService.getRoomTypes().subscribe((res) => {this.type = res.reverse()});
    this.roomService.getRoomServices().subscribe((res) => {this.services = res.sort()});
  }

  book(roomId: number) {
    
    if(this.checkIn >= this.checkOut) {
      this.messageService.add({key:'bc', severity: 'error', detail:
        'La data di check-in viene prima della data di check-out!'});
    }
    else {
    this.router.navigate(['book/'+roomId+'/'+this.checkIn+'/'+this.checkOut]);
    }
  }

  back() {
    this.router.navigate(['browse-rooms']);
    
  }

}
