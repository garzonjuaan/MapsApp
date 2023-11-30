import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: [ './full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;



  ngAfterViewInit(): void {

    if (!this.divMap) throw 'Elemento HTML no fue encontrado'

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.08175, 4.60971], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

}
