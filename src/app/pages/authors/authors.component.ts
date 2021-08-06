import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors:any;
  constructor(private authorsService:AuthorsService) { }

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe( (data) => {
      this.authors = Object.values(data).map( author => {
        return {
          ...author,
          fullname : `${author.firstName} ${author.secondName} ${author.surname}`,
          birthdate : new Date(author.birthdate).toLocaleDateString()
        }
      })
    })
  }

  removeAuthor( id: any){
    this.authors = this.authors.filter( (author:any) => author.id != id)
  }

}
