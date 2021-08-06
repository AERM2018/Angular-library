import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorComponent } from './pages/author/author.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { BookComponent } from './pages/book/book.component';
import { NewAuthorComponent } from './pages/new-author/new-author.component';
import { UpdateBookComponent } from './pages/update-book/update-book.component';
import { UpdateAuthorComponent } from './pages/update-author/update-author.component';

const routes:Routes = [
  {path:'books/newBook', component : NewBookComponent, },
  {path:'books/:id/update', component : UpdateBookComponent},
  {path:'books/:id', component : BookComponent},
  {path:'books', component : HomeComponent},
  {path:'authors/newAuthor', component : NewAuthorComponent},
  {path:'authors/:id/update', component : UpdateAuthorComponent},
  {path:'authors/:id', component : AuthorComponent},
  {path:'authors', component : AuthorsComponent},
  {path:'',redirectTo:'books',pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
