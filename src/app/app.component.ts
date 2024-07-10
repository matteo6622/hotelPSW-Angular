import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddRoomBetterComponent } from './add-room-better/add-room-better.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingRecapComponent } from './booking-recap/booking-recap.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { KeycloakAngularModule} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, 
    RouterLinkActive, AddRoomBetterComponent, RoomsComponent, UpdateRoomComponent, NavbarComponent,
  BrowseRoomsComponent, AdminComponent, HomeComponent, BookingFormComponent, BookingRecapComponent,
  ManageBookingsComponent, KeycloakAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'hotelPSW';

  constructor() {}
}
