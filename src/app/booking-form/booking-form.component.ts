import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../service/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule} from 'primeng/card';
import { FloatLabelModule} from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../model/booking';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RoomService } from '../service/room.service';

@Component({
  standalone: true,
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  imports: [ReactiveFormsModule, CardModule, FloatLabelModule, InputTextModule, CalendarModule,
     MatButtonModule, ToastModule]
})
export class BookingFormComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    guestName: new FormControl('', Validators.required),
    guestEmail: new FormControl('', Validators.required),
    checkIn: new FormControl('', Validators.required),
    checkOut: new FormControl('', Validators.required),
    guestsNumber: new FormControl('', Validators.required)
  });
  confirmString: string = '';
  typeRoom!: String;
  numberG!: number;
  


  constructor(private bookingService: BookingService, private router: Router, 
    private aRouter: ActivatedRoute, private messageService: MessageService,
    private roomService: RoomService) {
  }

  ngOnInit() {
    this.roomService.getRoom(this.aRouter.snapshot.params['id']).subscribe((res) => {
      this.typeRoom = res['roomType'];
      switch(this.typeRoom) {
        case "Singola": {
          this.numberG = 1;
          break;
        }
        case "Doppia": {
          this.numberG = 2;
          break;
        }
        case "Royal": {
          this.numberG = 3;
          break;
        }
        case "Quadrupla": {
          this.numberG = 4;
          break;
        }
      }
      this.bookForm = new FormGroup({
        guestName: new FormControl('', Validators.required),
        guestEmail: new FormControl('', Validators.required),
        checkIn: new FormControl(this.aRouter.snapshot.params['checkIn'], Validators.required),
        checkOut: new FormControl(this.aRouter.snapshot.params['checkOut'], Validators.required),
        guestsNumber: new FormControl(this.numberG, Validators.required)
      });

    });
    
  }

  onSubmit() {
    console.log(JSON.stringify(this.bookForm.value));
    if(this.bookForm.value.guestsNumber > this.numberG || this.bookForm.value.guestsNumber == 0) {
      this.messageService.add({key:'bc', severity: 'error', detail:
         'Il numero di ospiti per questa stanza deve essere maggiore di 0 e al massimo '+this.numberG+'!'});
    }
    else if(this.bookForm.value.checkIn >= this.bookForm.value.checkOut) {
      this.messageService.add({key:'bc', severity: 'error', detail:
        'La data di check-in viene prima della data di check-out!'});
    }
    else {
    this.bookingService.bookRoom(this.aRouter.snapshot.params['id'], 
      new Booking(this.bookForm.value.checkIn, this.bookForm.value.checkOut,
        this.bookForm.value.guestName,  this.bookForm.value.guestEmail, this.bookForm.value.guestsNumber))
        .subscribe((res) => {
        const data = JSON.stringify(res);
        console.log(data);
        if(data != '"La stanza non è disponibile nelle date selezionate!"') {
          this.confirmString = data;
          let position = this.confirmString.indexOf(":");
          this.confirmString = this.confirmString.substring(position+2, this.confirmString.length-1);
          this.router.navigate
          (['book-success/recap/'+this.aRouter.snapshot.params['id']+'/'+this.confirmString ]);
        }
        this.messageService.add
        ({key:'bc', severity: 'error', detail: 'Le date selezionate non sono disponibili'});
      });
    }
      
  }

}
