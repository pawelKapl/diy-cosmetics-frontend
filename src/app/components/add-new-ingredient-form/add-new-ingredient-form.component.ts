import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../services/ingredient.service';
import {Ingredient} from '../../models/ingredient';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-new-ingredient-form',
  templateUrl: './add-new-ingredient-form.component.html',
  styleUrls: ['./add-new-ingredient-form.component.css']
})
export class AddNewIngredientFormComponent implements OnInit {

  ingredientFormGroup: FormGroup;
  ingredient: Ingredient = new Ingredient();

  private promise: Promise<unknown>;
  private update: boolean;


  constructor(private formBuilder: FormBuilder,
              private ingredientService: IngredientService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.populatingIfUpdate());
  }

  private getFormGroup() {
    this.ingredientFormGroup = this.formBuilder.group({
      id: new FormControl(this.ingredient.id),
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

  private populatingIfUpdate() {
    this.update = this.route.snapshot.paramMap.has('id');

    if (this.update) {
      let id: number = +this.route.snapshot.paramMap.get('id');
      this.promise = new Promise((resolve) => {
        this.ingredientService.getIngredientById(id).subscribe(data => {
          this.ingredient = data, resolve(data);
        });
      });
      this.promise.then(() => this.getFormGroup());
    } else {
      this.getFormGroup();
    }
  }

  get name() {
    return this.ingredientFormGroup.get('name');
  }

  get imageUrl() {
    return this.ingredientFormGroup.get('imageUrl');
  }

  onSubmit() {
    console.log('Handling submit button', this.ingredientFormGroup.get('id'));
    if (this.update) {
      this.ingredientService.updateIngredient(this.ingredientFormGroup);
    } else {
      this.ingredientService.saveIngredient(this.ingredientFormGroup);
    }
  }


}
