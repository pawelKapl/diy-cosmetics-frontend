import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {IngredientService} from '../../services/ingredient.service';
import {Ingredient} from '../../models/ingredient';

@Component({
  selector: 'app-ingredient-replacements-modal',
  templateUrl: './ingredient-replacements-modal.component.html',
  styleUrls: ['./ingredient-replacements-modal.component.css']
})
export class IngredientReplacementsModalComponent implements OnInit {

  @Input()
  ingredientId: number;

  replacements: Ingredient[] = [];

  constructor(private modal: ConfirmationModalComponent,
              private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.ingredientService.getReplacements(this.ingredientId).subscribe(data => this.replacements = data);
  }

  open(content) {
    this.modal.open(content);
  }

}
