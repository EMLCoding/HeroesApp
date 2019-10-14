import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  cargando = false;

  constructor( private heroesService: HeroesService) { }

  ngOnInit() {

    this.cargando = true;

    this.heroesService.getHeroes().subscribe( respuesta => {
      this.heroes = respuesta;
      this.cargando = false;
    });
  }

  borrarHeroe ( heroe: HeroeModel, i: number ){

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que dese borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( respuesta => {
      // Si se pulsa el boton de Confirmar...
      if ( respuesta.value ) {
        // Borra un elemento desde la posicion 'i'
        this.heroes.splice(i, 1);

        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }

}
