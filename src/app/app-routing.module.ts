import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthentificationModule } from './authentification/authentification.module';

const routes: Routes = [
  { path : "", component : HomeComponent},
  { path : "home", redirectTo : "/"},
  { path : "authentification", loadChildren : () => import("./authentification/authentification.module").then(m => m.AuthentificationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
