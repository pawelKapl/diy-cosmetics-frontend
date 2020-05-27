import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RecipeService} from './services/recipe.service';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
