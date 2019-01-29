import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { MDCRipple } from '@material/ripple';
import {MediaObserver} from '@angular/flex-layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatSliderModule, DateAdapter} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from './personal-info/personal-info.component'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsService } from './details.service';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatTableModule } from '@angular/material/table';
import { DialogSelectParentComponent } from './dialog-select-parent/dialog-select-parent.component';
import { DialogSelectEducationTypeComponent } from './dialog-select-education-type/dialog-select-education-type.component';
import { DialogSelectAddLanguageComponent } from './dialog-select-add-language/dialog-select-add-language.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FinishPageComponent } from './finish-page/finish-page.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonalInfoComponent,
    DialogMessageComponent,
    SpinnerComponent,
    DialogSelectParentComponent,
    DialogSelectEducationTypeComponent,
    DialogSelectAddLanguageComponent,
    FinishPageComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    HttpModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ],
  providers: [
    MatSliderModule,
    DetailsService,
    LoginComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogMessageComponent, 
    DialogSelectParentComponent, 
    DialogSelectEducationTypeComponent,
    DialogSelectAddLanguageComponent ]
})
export class AppModule { }
