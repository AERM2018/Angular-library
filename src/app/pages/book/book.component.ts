import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(
    private booksService:BooksService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  book:any;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.booksService.getBookById(id).subscribe( data => {
      this.book = Object.values(data)[0]
    })
  }

  deleteBook( id: number){
    this.booksService.deleteBook(id).subscribe( data => {
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success',
          didClose : () => this.router.navigate(['books'])
        })
    },(error)=>{console.log(error)
      const {msg} = error.error
        Swal.fire({
          title : 'Oops',
          text : msg,
          icon : 'error'
        })
    })
  }
}
