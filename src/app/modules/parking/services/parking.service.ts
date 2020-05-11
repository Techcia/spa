import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  parkings: any = [
    {id: 1, name: "Estacionamento 1", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 2, name: "Estacionamento 2", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 3, name: "Estacionamento 3", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 4, name: "Estacionamento 4", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 5, name: "Estacionamento 5", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 6, name: "Estacionamento 6", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 7, name: "Estacionamento 7", numberOfVacancies: 10, occupiedPlaces: 5},
    {id: 8, name: "Estacionamento 8", numberOfVacancies: 10, occupiedPlaces: 5},
  ];
  onParkingChanged: BehaviorSubject<any>;
  constructor() {
    this.onParkingChanged = new BehaviorSubject({});
   }
}
