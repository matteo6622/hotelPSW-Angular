import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { Room } from '../model/room';
import { TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TrashIcon } from 'primeng/icons/trash';
import {DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  imports: [TableModule, ButtonModule, TagModule, CurrencyPipe, TrashIcon, DropdownModule, FormsModule]
})
export class RoomsComponent implements OnInit {

  rooms!: Room[];
  type!: String[];
  services!: String[];

  constructor(private roomService: RoomService, private router:Router) { }

  ngOnInit() {

    this.roomService.getRooms().subscribe((rooms) => { this.rooms = rooms; console.log(this.rooms);});
    this.roomService.getRoomTypes().subscribe((res) => { this.type = res.reverse()});
    this.roomService.getRoomServices().subscribe((res) => { this.services = res.sort()});
    
  }

  deleteRoom(roomId: number){
    this.roomService.deleteRoom(roomId).subscribe(() => {
      this.router.navigate(['rooms']);
      this.reloadPage();
    });
    //per testare window.location.reload() bisogna creare un metodo (per esempio reloadPage()) e inserire
    //window.location.reload() dentro. Nella classe di test potremmo fare così 
    //spyOn(component, 'reloadPage')
  }

  reloadPage() {
    window.location.reload();
  }

  updateRoom(roomId: number) {
    this.router.navigate(['rooms/update/'+roomId]);
  }

}
