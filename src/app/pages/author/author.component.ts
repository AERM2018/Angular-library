import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Author } from 'src/app/interfaces/author';
import { AuthorsService } from 'src/app/services/authors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {

  constructor(private authorsService:AuthorsService,  private route:ActivatedRoute, private router:Router) { }

  author:any;
  ngOnInit(): void {
    const id  = Number(this.route.snapshot.paramMap.get('id'))
    this.authorsService.getAuthorById(id).subscribe( (data) => {
      const author = Object.values(data)[0]
      this.author= 
        {...author,
        fullname : `${author.firstName} ${author.secondName} ${author.surname}`,
        birthdate: new Date(author.birthdate).toLocaleDateString()}
      
    })
  }

  deleteAuthorById( id: number){
    this.authorsService.deleteAuthor( id ).subscribe( (data) =>{
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success',
          didClose: () => this.router.navigate(['authors'])
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
