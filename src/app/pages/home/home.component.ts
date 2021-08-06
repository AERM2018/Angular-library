import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private booksService:BooksService) { }

  books:any= []
  ngOnInit(): void {
    this.booksService.getBooks().subscribe( (data) => {
      this.books = data
    })
  }

  removeBook( id:any ){
    console.log("padre",id)
    this.books = this.books.filter( (book:any) => book.id != id)
  }

}
