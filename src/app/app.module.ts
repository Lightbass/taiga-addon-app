import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TaigaApiService } from './services/taiga-api.service';
import { TaskListComponent } from './task-list/task-list.component';
import { ApiInterseptorService } from './services/api-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TaigaApiService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterseptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
