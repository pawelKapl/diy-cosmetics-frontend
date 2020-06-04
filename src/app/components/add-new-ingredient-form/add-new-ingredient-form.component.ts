import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IngredientService} from '../../services/ingredient.service';

@Component({
  selector: 'app-add-new-ingredient-form',
  templateUrl: './add-new-ingredient-form.component.html',
  styleUrls: ['./add-new-ingredient-form.component.css']
})
export class AddNewIngredientFormComponent implements OnInit {

  ingredientFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.ingredientFormGroup = this.formBuilder.group({
      ingredient: this.formBuilder.group({
        name: [''],
        latinName: [''],
        description: [''],
        blogUrl: [''],
        imageUrl: ['']
      })
    });
  }

  onSubmit() {
    console.log('Handling submit button');
    this.ingredientService.saveIngredient(this.ingredientFormGroup.get('ingredient'));
  }
}
