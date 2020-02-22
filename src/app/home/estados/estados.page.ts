import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
})
export class EstadosPage implements OnInit {
  recentEstados = [
    {
      avatar:'https://i.pravatar.cc/150',
      name: 'Fernando Quiroz',
      fecha: 'Hoy 15:34'
    },
    {
      avatar:'https://i.pravatar.cc/151',
      name: 'Juan Diaz',
      fecha: 'Hoy 15:30'
    },
    {
      avatar:'https://i.pravatar.cc/152',
      name: 'Pedro Juarez',
      fecha: 'Hoy 05:34'
    },
    {
      avatar:'https://i.pravatar.cc/153',
      name: 'Javier Zepeda',
      fecha: 'Hoy 11:24'
    },
    {
      avatar:'https://i.pravatar.cc/154',
      name: 'Luis Duran',
      fecha: 'Hoy 09:18'
    }
];
vistosEstados = [
  {
    avatar:'https://i.pravatar.cc/150',
    name: 'Fernando Quiroz',
    fecha: 'Hoy 15:34'
  },
  {
    avatar:'https://i.pravatar.cc/151',
    name: 'Juan Diaz',
    fecha: 'Hoy 15:30'
  }
];
  constructor() { }

  ngOnInit() {
  }

}
