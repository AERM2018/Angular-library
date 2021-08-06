import { Injectable } from '@angular/core';
import { Author } from 'src/app/interfaces/author';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  authors:any;
  constructor(private http:HttpClient) { }

  getAuthors(){
    return this.http.get('https://nestjs-server-aerm.herokuapp.com/authors')
    }

  getAuthorById( id:number){
    return this.http.get(`https://nestjs-server-aerm.herokuapp.com/authors/${id}`)
  }

  createNewAuthor( author:FormData ){
    return this.http.post('https://nestjs-server-aerm.herokuapp.com/authors',author)
  }

  updateAuthor( id:number, author:FormData){
    return this.http.put(`https://nestjs-server-aerm.herokuapp.com/authors/${id}`,author)
  }

  deleteAuthor( id:number ){
    return this.http.delete(`https://nestjs-server-aerm.herokuapp.com/authors/${id}`)
  }
  }

