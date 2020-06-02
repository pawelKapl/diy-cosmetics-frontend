import { Component, OnInit } from '@angular/core';
import {Tool} from '../../models/tool';
import {ToolService} from '../../services/tool.service';
import {RecipeCategory} from '../../models/recipe-category';
import {RecipeService} from '../../services/recipe.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-new-recipe-form',
  templateUrl: './add-new-recipe-form.component.html',
  styleUrls: ['./add-new-recipe-form.component.css']
})
export class AddNewRecipeFormComponent implements OnInit {

  recipeFormGroup: FormGroup;
  toolsList: Tool[] = [];
  categoriesList: RecipeCategory[] = [];

  constructor(private toolService: ToolService,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getToolList();
    this.getCategoryList();
    this.recipeFormGroup = this.formBuilder.group({
      recipe: this.formBuilder.group({
        recipeCategories: [null],
        name: [''],
        intro: [''],
        description: [''],
        difficulty: ['EASY'],
        prepTime: [''],
        tools: [null],
        imageUrl: [''],
      })
    });
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

  onSubmit() {
    console.log(this.recipeFormGroup.get('recipe').value);
    this.recipeService.saveRecipe(this.recipeFormGroup.get('recipe'));
  }
}
