import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://loginapp-def25.firebaseio.com'

  constructor( private http: HttpClient) { }

  crearHeroe ( heroe: HeroeModel) {
    // El ".json" es solo porque es para firebase
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map ( (respuesta: any) => {
        heroe.id = respuesta.name;
        return heroe;
      })
    );
  }

  actualizarHeroe( heroe: HeroeModel) {

    // El "...heroe" coge automaticamente TODOS los atributos del heroe
    const heroeTemp = {
      ...heroe
    };

    // Se elimina el id del heroeTemporal que se envia para que no tenga el id duplicado el Firebase
    delete heroeTemp.id;

    return this.http.put( `${this.url}/heroes/${ heroe.id }.json`, heroeTemp);
  }

  borrarHeroe ( id: string ) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map( respuesta => this.crearArray(respuesta))
    );
  }

  getHeroeById( id:string ){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  // Metodo para crear un Array del heroes almacenados en Firebase
  private crearArray ( heroesObj: object) {
    
    const heroes: HeroeModel[] = [];

    if ( heroesObj === null) { return []; }

    Object.keys ( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );
    })
    
    return heroes;
  }
}
