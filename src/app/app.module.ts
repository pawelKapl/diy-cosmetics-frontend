import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './services/recipe.service';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCategoryMenuComponent } from './components/recipe-category-menu/recipe-category-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import {IngredientService} from './services/ingredient.service';

const routes: Routes = [
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
    RecipeDetailComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        RouterModule.forRoot(routes)
    ],
  providers: [RecipeService, IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
