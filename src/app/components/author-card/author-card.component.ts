import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  constructor(
    private authorsService:AuthorsService
  ) { }

  @Input() author:any;
  @Output() deleteAuthorOut = new EventEmitter<number>();
  ngOnInit(): void {
  }


  deleteAuthorById( id: number){
    this.authorsService.deleteAuthor( id ).subscribe( (data) =>{
      this.deleteAuthorOut.emit(id)
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success'
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
