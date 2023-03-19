import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterFormComponent } from './character/components/character-form/character-form.component';
import { CharacterListComponent } from './character/components/character-list/character-list.component';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'character/:id', component: CharacterFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
