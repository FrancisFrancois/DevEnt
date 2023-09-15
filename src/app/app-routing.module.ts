import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';


const routes: Routes = [
  { path : "", component : HomeComponent},
  { path : "home", redirectTo : "/"},
  { path : "authentification", loadChildren : () => import("./authentification/authentification.module").then(m => m.AuthentificationModule) },
  { path : "events", loadChildren : () => import("./events/events.module").then(m => m.EventsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
