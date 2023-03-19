import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character/components/character-list/character-list.component';
import { CharacterFormComponent } from './character/components/character-form/character-form.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CharacterService } from './character/services/character.service';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClientModule,
    CharacterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
