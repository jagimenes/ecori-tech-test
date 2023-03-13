import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { ListCharactersComponent } from './Components/list-characters/list-characters.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ListCharactersComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
