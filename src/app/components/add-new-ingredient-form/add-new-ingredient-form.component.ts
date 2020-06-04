import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../services/ingredient.service';
import {Ingredient} from '../../models/ingredient';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-add-new-ingredient-form',
  templateUrl: './add-new-ingredient-form.component.html',
  styleUrls: ['./add-new-ingredient-form.component.css']
})
export class AddNewIngredientFormComponent implements OnInit {

  ingredientFormGroup: FormGroup;
  ingredient: Ingredient = new Ingredient();


  constructor(private formBuilder: FormBuilder, private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.ingredientFormGroup = this.formBuilder.group({
      name: new FormControl(this.ingredient.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      latinName: new FormControl(this.ingredient.name),
      description: new FormControl(this.ingredient.description),
      blogUrl: new FormControl(this.ingredient.blogUrl),
      imageUrl: new FormControl(this.ingredient.imageUrl, [
        Validators.required,
        Validators.pattern(environment.reg)
      ])
    });
  }

  get name() {
    return this.ingredientFormGroup.get('name');
  }

  get imageUrl() {
    return this.ingredientFormGroup.get('imageUrl');
  }

  onSubmit() {
    console.log('Handling submit button');
    this.ingredientService.saveIngredient(this.ingredientFormGroup);
  }
}
