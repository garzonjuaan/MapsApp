import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.08175, 4.60971)

  @ViewChild('map') divMap?: ElementRef


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Elemento HTML no fue encontrado'

    this.map = new Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }


  mapListeners(){
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom',(ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend',(ev) => {

      if (this.map!.getZoom() < 18) return
      this.map!.zoomTo(18)
    })

    this.map.on('move', () => {
      this.lngLat = this.map!.getCenter();
    })

  }

  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut()

  }

  zoomChaged( value: string ){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom)
  }

}
