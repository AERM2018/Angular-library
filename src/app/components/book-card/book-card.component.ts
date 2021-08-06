import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/interfaces/author';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {

  constructor( private booksService:BooksService) { }

  @Input() book:any;
  @Output() deleteBookOut = new EventEmitter<number>();
  ngOnInit(): void {
  }

  deleteBook( id: number){
    this.deleteBookOut.emit(id)
    this.booksService.deleteBook(id).subscribe( data => {
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success'
        })
    })
  }

}
