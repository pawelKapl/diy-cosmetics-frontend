import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RecipeService} from './services/recipe.service';
import {RecipeListComponent} from './components/recipe-list/recipe-list.component';
import {RecipeCategoryMenuComponent} from './components/recipe-category-menu/recipe-category-menu.component';
import {RouterModule, Routes} from '@angular/router';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {RecipeDetailComponent} from './components/recipe-detail/recipe-detail.component';
import {IngredientService} from './services/ingredient.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IngredientListComponent} from './components/ingredient-list/ingredient-list.component';
import {AddNewIngredientFormComponent} from './components/add-new-ingredient-form/add-new-ingredient-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AddNewToolFormComponent} from './components/add-new-tool-form/add-new-tool-form.component';
import {AddNewRecipeFormComponent} from './components/add-new-recipe-form/add-new-recipe-form.component';
import {ConfirmationModalComponent} from './components/confirmation-modal/confirmation-modal.component';
import {SelfClosingAlertComponent} from './components/alerts/self-closing-alert/self-closing-alert.component';
import {StepService} from './services/step.service';
import {IngredientQuantityService} from './services/ingredient-quantity.service';
import { AddNewQuantityComponent } from './components/add-new-quantity/add-new-quantity.component';
import { AddNewStepComponent } from './components/add-new-step/add-new-step.component';


const routes: Routes = [
  {path: 'recipes/update/:id', component: AddNewRecipeFormComponent},
  {path: 'tools/update/:id', component: AddNewToolFormComponent},
  {path: 'ingredients/update/:id', component: AddNewIngredientFormComponent},
  {path: 'recipes/new', component: AddNewRecipeFormComponent},
  {path: 'tools/new', component: AddNewToolFormComponent},
  {path: 'ingredients/new', component: AddNewIngredientFormComponent},
  {path: 'ingredients/:id', component: IngredientListComponent},
  {path: 'ingredients', component: IngredientListComponent},
  {path: 'recipeCategory/:id', component: RecipeListComponent},
  {path: 'recipeCategory', component: RecipeListComponent},
  {path: 'search/:query', component: RecipeListComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: '', component: RecipeListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeCategoryMenuComponent,
    SearchBarComponent,
    RecipeDetailComponent,
    IngredientListComponent,
    AddNewIngredientFormComponent,
    AddNewToolFormComponent,
    AddNewRecipeFormComponent,
    ConfirmationModalComponent,
    SelfClosingAlertComponent,
    AddNewQuantityComponent,
    AddNewStepComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    RecipeService,
    IngredientService,
    IngredientQuantityService,
    StepService,
    ConfirmationModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
