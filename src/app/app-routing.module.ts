import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'personalInfo', component: PersonalInfoComponent,
},
 { path: 'login', component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
