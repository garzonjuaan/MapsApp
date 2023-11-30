import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { reduce } from 'rxjs';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  public markers: MarkerAndColor[] = [];


  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.08175, 4.60971)

  @ViewChild('map') divMap?: ElementRef


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Elemento HTML no fue encontrado'

    this.map = new Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });
  }

  createMarker(){

    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnLat = this.map.getCenter()

    this.addMarker( lgnLat, color );
  }

  addMarker( lgnLat: LngLat, color: string ){
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lgnLat)
      .addTo( this.map )

      this.markers.push({ color, marker  })

  }

  deleteMarker(index: number){
    this.markers[index].marker.remove()
    this.markers.splice(index, 1)
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

}
