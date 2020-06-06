import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Tool} from '../../models/tool';
import {ToolService} from '../../services/tool.service';
import {RecipeCategory} from '../../models/recipe-category';
import {RecipeService} from '../../services/recipe.service';
import {IngredientService} from '../../services/ingredient.service';
import {Ingredient} from '../../models/ingredient';
import {UnitOfMeasure} from '../../models/unit-of-measure';
import {Recipe} from '../../models/recipe';
import {environment} from '../../../environments/environment';
import {Step} from '../../models/step';
import {IngredientQuantity} from '../../models/ingredient-quantity';
import {ActivatedRoute} from '@angular/router';

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

  recipe: Recipe = new Recipe();
  step: Step = new Step();
  stepCount = 0;

  ingredientQuantity: IngredientQuantity = new IngredientQuantity();

  private promise: Promise<unknown>;
  update: boolean;

  constructor(private toolService: ToolService,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.populatingIfUpdate());
  }

  private getFormGroup() {
    this.populateSelectors();
    this.recipeFormGroup = this.formBuilder.group({
      id: new FormControl(this.recipe.id),
      recipeCategories: new FormControl(this.recipe.recipeCategories as RecipeCategory[]),
      name: new FormControl(this.recipe.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      intro: new FormControl(this.recipe.intro),
      description: new FormControl(this.recipe.description),
      difficulty: new FormControl(this.recipe.difficulty, [
        Validators.required
      ]),
      prepTime: new FormControl(this.recipe.prepTime, [
        Validators.required,
        Validators.max(1000),
        Validators.min(3),
        Validators.pattern('[0-9]+')
      ]),
      tools: new FormControl(this.recipe.tools),
      imageUrl: new FormControl(this.recipe.imageUrl, [
        Validators.required,
        Validators.pattern(environment.reg)
      ]),
      steps: this.formBuilder.array([]),
      ingredientQuantities: this.formBuilder.array([])
    });
  }

  private populateSelectors() {
    this.getToolList();
    this.getCategoryList();
    this.getIngredientList();
    this.getUnitOfMeasureList();
  }

  private populatingIfUpdate() {
    this.update = this.route.snapshot.paramMap.has('id');

    if (this.update) {
      let id: number = +this.route.snapshot.paramMap.get('id');
      this.promise = new Promise((resolve) => {
        this.recipeService.getRecipe(id).subscribe(data => {
          this.recipe = data, resolve(data);
        });
      });
      this.promise.then(() => {
        this.getFormGroup();
      });
    } else {
      this.getFormGroup();
    }
  }

  newStep(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(this.step.id),
      seq: new FormControl(this.stepCount++),
      name: new FormControl(this.step.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      detail: new FormControl(this.step.detail)
    });
  }

  newQuantity(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(this.ingredientQuantity.id),
      ingredient: new FormControl(this.ingredientQuantity.ingredient, Validators.required),
      amount: new FormControl(this.ingredientQuantity.amount, [
        Validators.required,
        Validators.max(10000),
        Validators.min(1),
        Validators.pattern('[0-9]+')
      ]),
      unitOfMeasure: new FormControl(this.ingredientQuantity.unitOfMeasure, Validators.required)
    });
  }

  get name() {
    return this.recipeFormGroup.get('name');
  }

  get imageUrl() {
    return this.recipeFormGroup.get('imageUrl');
  }

  get difficulty() {
    return this.recipeFormGroup.get('difficulty');
  }

  get prepTime() {
    return this.recipeFormGroup.get('prepTime');
  }

  ingredientQuantityIngredientCheck(id: number) {
    return this.quantities().at(id).get('ingredient');
  }

  ingredientQuantityUomCheck(id: number) {
    return this.quantities().at(id).get('unitOfMeasure');
  }

  ingredientQuantityAmountCheck(id: number) {
    return this.quantities().at(id).get('amount');
  }

  stepCheck(id: number) {
    return this.steps().at(id).get('name');
  }

  quantities(): FormArray {
    return this.recipeFormGroup.get('ingredientQuantities') as FormArray;
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  steps(): FormArray {
    return this.recipeFormGroup.get('steps') as FormArray;
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
    this.ingredientService.getFullIngredientList(0, 100, 'asc').subscribe(
      data => this.ingredientList = data.content
    );
  }

  private getUnitOfMeasureList() {
    this.ingredientService.getUnitsOfMeasure().subscribe(
      data => this.unitOfMeasureList = data
    );
  }

  compareCategoryById(c1: RecipeCategory, c2: RecipeCategory): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareToolById(t1: Tool, t2: Tool): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  onSubmit() {
    console.log(JSON.stringify(this.recipeFormGroup.value));
    if (this.update) {
      this.recipeService.updateRecipe(this.recipeFormGroup);
    } else {
      this.recipeService.saveRecipe(this.recipeFormGroup);
    }
  }
}
