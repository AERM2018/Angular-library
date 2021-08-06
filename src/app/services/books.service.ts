import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  getBooks(){
    return this.http.get(`https://nestjs-server-aerm.herokuapp.com/books`)
  }

  getBookById( id:number ){
    return this.http.get(`https://nestjs-server-aerm.herokuapp.com/books/${id}`)
  }

  createNewBook( book:FormData){
    return this.http.post(`https://nestjs-server-aerm.herokuapp.com/books`,book)
  }

  updateBook(id:number, book:FormData){
    return this.http.put(`https://nestjs-server-aerm.herokuapp.com/books/${id}`,book)
  }
  deleteBook( id:number ){
    return this.http.delete(`https://nestjs-server-aerm.herokuapp.com/books/${id}`)
  }

}
