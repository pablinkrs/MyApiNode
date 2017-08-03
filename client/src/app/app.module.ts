import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { routing, appRoutingProvider } from './app.routing';
import { AppComponent } from './app.component';
import { UserMant } from './components/user.mant';

@NgModule({
  declarations: [
    AppComponent,
    UserMant
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
