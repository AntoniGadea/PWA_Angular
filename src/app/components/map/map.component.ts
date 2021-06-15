import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() latitude;
  @Input() longitude;
  
  center: any;
  zoom = 15;
  display?: google.maps.LatLngLiteral;

  constructor() { 
    
   }


  ngOnInit(): void {
    this.center= {
      lat: this.latitude,
      lng: this.longitude
    }
  }

}
