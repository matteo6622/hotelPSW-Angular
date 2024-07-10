import { Booking } from "./booking";

export class Room {
    name: String;
    description: String;
    price: number;
    roomType: String;
    services: String[];
    bookings!: Booking[];
  
    constructor(name: String, description: String, price: number, roomType: String,
       services: String[]) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.roomType = roomType;
      this.services = services;
    }
  }  