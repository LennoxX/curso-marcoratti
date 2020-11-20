import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit {

  resources = new Array();
  loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
