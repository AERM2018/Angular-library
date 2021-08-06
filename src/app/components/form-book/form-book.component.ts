import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

interface INewBook{
  id:number
  title:string,
  numPages:string,
  description:string,
  ISBN:string,
  cover:string,
  author : Author | null

}

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {

  book:INewBook = {
    id:0,
    title:"",
    numPages:"",
    description:"",
    ISBN:"",
    cover:"",
    author : null
  }

  authors:any;
  @ViewChild('fileInput') fileInputElement: any 
  imageFile:any;
  form:FormGroup = new FormGroup({})

  constructor(
    private authorsService:AuthorsService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private booksService:BooksService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe( (data) => {
      this.authors = Object.values(data)
    })
    this.form = this.formBuilder.group({
      'title' : ['',Validators.required],
      'description' : ['',[Validators.required,Validators.minLength(1),Validators.maxLength(500)]],
      'numPages' : ['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      'ISBN' : ['',[Validators.required,Validators.pattern(new RegExp('^[0-9]{0,10}$'))]],
      'author' : ['',Validators.required],
      'cover' : ['',],
      

    })
    this.cargarBook()
  }


  cargarBook(){
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if(id){
      this.booksService.getBookById(id).subscribe( (data:any) => {
        this.book = data[0];
        this.authors = this.authors.map((author:any) => {
            if(author.id == this.book.author?.id) return {...author,active:true}
            return author
        })
      })
    }
  }
  uploadFile(){
    this.imageFile = this.fileInputElement.nativeElement.files[0]
  }

  submit() {
    if(this.form.valid){
      const data = new FormData()
      data.set('title',this.book.title);
      data.set('numPages',this.book.numPages);
      data.set('description',this.book.description);
      data.set('ISBN',this.book.ISBN);
      data.set('author',JSON.parse(JSON.stringify(this.book.author)));
      data.set('image',this.imageFile)

      this.booksService.createNewBook(data)
      .subscribe( data => {
        const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success',
          didClose : () => this.router.navigate(['/'])
        })
        
      },(error)=>{
        console.log(error)
        Swal.fire({
          title : 'Opps',
          text : 'Something went wrong',
          icon : 'error'
        })
      })

    }
  }

  update(){
    if(this.form.valid){
      const dataUpdate = new FormData()
      dataUpdate.set('title',this.book.title);
      dataUpdate.set('numPages',this.book.numPages);
      dataUpdate.set('description',this.book.description);
      dataUpdate.set('ISBN',this.book.ISBN);
      dataUpdate.set('author',JSON.parse(JSON.stringify(this.book.author?.id)));
    if(this.imageFile){
      dataUpdate.set('image',this.imageFile)
    }
    dataUpdate.forEach( e => console.log(e))
    this.booksService.updateBook(this.book.id,dataUpdate).subscribe( data => {
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success',
          didClose : () => this.router.navigate(['/books'])
        })
    },(error)=>{
      console.log(error)
      Swal.fire({
        title : 'Oops',
        text : 'Something went wrong',
        icon : 'error'
      })
    }
    )
    }
  }
}
