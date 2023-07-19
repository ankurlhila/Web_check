import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { MainComponent } from './main/main.component';
import {MatButtonModule} from '@angular/material/button';
import { VidComponent } from './vid/vid.component';
import { AudComponent } from './aud/aud.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    VidComponent,
    AudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
