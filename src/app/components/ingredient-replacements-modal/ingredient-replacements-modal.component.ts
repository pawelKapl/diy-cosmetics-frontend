import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {Ingredient} from '../../models/ingredient';

@Component({
  selector: 'app-ingredient-replacements-modal',
  templateUrl: './ingredient-replacements-modal.component.html',
  styleUrls: ['./ingredient-replacements-modal.component.css']
})
export class IngredientReplacementsModalComponent implements OnInit {

  @Input()
  replacements: Ingredient[] = [];

  constructor(private modal: ConfirmationModalComponent) {
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modal.open(content);
  }

}
