import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { FinishPageComponent } from './finish-page/finish-page.component';

const routes: Routes = [{
  path: 'personalInfo', component: PersonalInfoComponent,
},
{ 
  path: 'login', component: LoginComponent
},
{
  path: 'finishPage', component: FinishPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
