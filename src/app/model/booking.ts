import { Room } from "./room";


export class Booking {
    checkIn: Date;
    checkOut: Date;
    guestName: String;
    guestEmail: String;
    numberOfGuest: number;
    room!: Room[];
    numberOfDays!: number;

    constructor(checkIn: Date, checkOut: Date, guestName: String,
        guestEmail: String, numberOfGuest: number) {
            
            this.checkIn = checkIn;
            this.checkOut = checkOut;
            this.guestName = guestName;
            this.guestEmail = guestEmail;
            this.numberOfGuest = numberOfGuest;
            
        }
}