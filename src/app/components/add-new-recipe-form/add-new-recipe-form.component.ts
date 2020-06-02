import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Tool} from '../../models/tool';
import {ToolService} from '../../services/tool.service';
import {RecipeCategory} from '../../models/recipe-category';
import {RecipeService} from '../../services/recipe.service';
import {IngredientService} from '../../services/ingredient.service';
import {Ingredient} from '../../models/ingredient';
import {UnitOfMeasure} from '../../models/unit-of-measure';

@Component({
  selector: 'app-add-new-recipe-form',
  templateUrl: './add-new-recipe-form.component.html',
  styleUrls: ['./add-new-recipe-form.component.css']
})
export class AddNewRecipeFormComponent implements OnInit {

  recipeFormGroup: FormGroup;
  toolsList: Tool[] = [];
  unitOfMeasureList: UnitOfMeasure[] = [];
  categoriesList: RecipeCategory[] = [];
  ingredientList: Ingredient[] = [];

  constructor(private toolService: ToolService,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.getToolList();
    this.getCategoryList();
    this.getIngredientList();
    this.getUnitOfMeasureList();
    this.recipeFormGroup = this.formBuilder.group({
      recipe: this.formBuilder.group({
        recipeCategories: [null],
        name: [''],
        intro: [''],
        description: [''],
        difficulty: [null],
        prepTime: [''],
        tools: [null],
        imageUrl: [''],
        steps: this.formBuilder.array([]),
        ingredientQuantities: this.formBuilder.array([])
      })
    });
  }

  quantities(): FormArray {
    return this.recipeFormGroup.get('recipe').get('ingredientQuantities') as FormArray;
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  newQuantity(): FormGroup {
    return this.formBuilder.group({
      ingredient: null,
      amount: 1,
      unitOfMeasure: null
    });
  }

  steps(): FormArray {
    return this.recipeFormGroup.get('recipe').get('steps') as FormArray;
  }

  newStep(): FormGroup {
    return this.formBuilder.group({
      name: '',
      detail: '',
    });
  }

  addStep() {
    this.steps().push(this.newStep());
  }

  removeStep(i: number) {
    this.steps().removeAt(i);
  }

  private getToolList() {
    this.toolService.getToolsList().subscribe(
      data => this.toolsList = data
    );
  }

  private getCategoryList() {
    this.recipeService.getRecipeCategoriesList().subscribe(
      data => this.categoriesList = data
    );
  }

  private getIngredientList() {
    this.ingredientService.getFullIngredientList(0, 10, 'asc').subscribe(
      data => this.ingredientList = data.content
    );
  }

  private getUnitOfMeasureList() {
    this.ingredientService.getUnitsOfMeasure().subscribe(
      data => this.unitOfMeasureList = data
    );
  }

  onSubmit() {
    console.log(JSON.stringify(this.recipeFormGroup.get('recipe').value));
    this.recipeService.saveRecipe(this.recipeFormGroup.get('recipe'));
  }
}
