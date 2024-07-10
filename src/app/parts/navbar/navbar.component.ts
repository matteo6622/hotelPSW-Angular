import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import { MatAnchor } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatToolbarModule, MatButtonModule, MatAnchor, RouterModule]
})


export class NavbarComponent {

  constructor() { }


  logout() {
    window.open('http://localhost:8180/realms/hotelPSW/protocol/openid-connect/logout');
  }



}
