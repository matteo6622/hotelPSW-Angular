import { Routes } from '@angular/router';
import { AddRoomBetterComponent } from './add-room-better/add-room-better.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingRecapComponent } from './booking-recap/booking-recap.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { BrowseRoomsDateComponent } from './browse-rooms/browse-rooms-date/browse-rooms-date.component';
import { AuthGuard } from './service/keycloak/guards/auth.guard';

export const routes: Routes = [
    { path: 'admin/manage-rooms', component: RoomsComponent, canActivate: [AuthGuard]},
    { path: 'admin/manage-bookings', component: ManageBookingsComponent, canActivate: [AuthGuard]},
    { path: 'admin/addroom', component: AddRoomBetterComponent, canActivate: [AuthGuard]},
    { path: 'rooms/update/:id', component: UpdateRoomComponent},
    { path: 'browse-rooms', component: BrowseRoomsComponent},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'book/:id', component: BookingFormComponent},
    { path: 'book/:id/:checkIn/:checkOut', component: BookingFormComponent},
    { path: 'book-success/recap/:id/:code', component: BookingRecapComponent},
    { path: 'browse-rooms/:checkIn/:checkOut', component: BrowseRoomsDateComponent}

];
