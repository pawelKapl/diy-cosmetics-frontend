import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-ingredient-replacements-modal',
  templateUrl: './ingredient-replacements-modal.component.html',
  styleUrls: ['./ingredient-replacements-modal.component.css']
})
export class IngredientReplacementsModalComponent implements OnInit {

  replacements: Ingredient[] = [];

  action: Subject<boolean> = new Subject<boolean>();

  constructor(public modalRef: MDBModalRef) {
  }

  ngOnInit(): void {
  }

  close() {
    this.action.next(true);
  }
}
