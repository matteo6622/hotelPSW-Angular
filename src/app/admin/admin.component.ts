import { Component, OnInit } from '@angular/core';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [MatButtonModule, RouterModule, MatAnchor]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
