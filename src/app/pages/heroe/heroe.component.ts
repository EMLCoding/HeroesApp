import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService, private route: ActivatedRoute ) { }

  ngOnInit() {
    
    // De esta forma se coge el id de la URL en la que estamos
    const id = this.route.snapshot.paramMap.get('id');

    //Cuando el heroe es nuevo el valor cogido de la url para el id seria la palabra "nuevo"
    if (id !== 'nuevo' ) {
      this.heroesService.getHeroeById( id ).subscribe ( (respuesta: HeroeModel ) => {
        this.heroe = respuesta;
        this.heroe.id = id;
      });
    }
  }

  guardar( formu: NgForm ){
    if( formu.invalid) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( respuesta => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    })
    
    
  }

}
