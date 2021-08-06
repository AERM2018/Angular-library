import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorsComponent } from './pages/authors/authors.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorComponent } from './pages/author/author.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BookComponent } from './pages/book/book.component';
import { NewAuthorComponent } from './pages/new-author/new-author.component';
import { FormAuthorComponent } from './components/form-author/form-author.component';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { FormBookComponent } from './components/form-book/form-book.component';
import { UpdateAuthorComponent } from './pages/update-author/update-author.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthorsComponent,
    BookCardComponent,
    AuthorCardComponent,
    AuthorComponent,
    NewBookComponent,
    BookComponent,
    NewAuthorComponent,
    FormAuthorComponent,
    UpdateBookComponent,
    FormBookComponent,
    UpdateAuthorComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
