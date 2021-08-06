import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
interface INewAuhtor{
  id: number,
  firstName: string,
  secondName: string,
  surname: string,
  birthdate: string ,
  profilePic : File | null,
  bio : string

}
@Component({
  selector: 'app-form-author',
  templateUrl: './form-author.component.html',
  styleUrls: ['./form-author.component.css']
})
export class FormAuthorComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  author:INewAuhtor = {
    id : 0,
    firstName : "",
    secondName : "",
    surname : "",
    birthdate : "",
    profilePic  : null,
    bio:""
  }

  @ViewChild('fileInput') fileInputElement:any;
  imageFile:any;
  form:FormGroup = new FormGroup({})
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'firstName' : ['',Validators.required] ,
      'secondName' : [''],
      'surname' : ['',Validators.required],
      'birthDate' : ['',Validators.required],
      'bio' : ['',Validators.required],
      'profilePic' : ['']
    })
    this.cargarAuthor()
  }

  cargarAuthor(){
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if(id){
      this.authorsService.getAuthorById(id).subscribe( (data:any) => {
        this.author = data[0]
        this.author.profilePic = null
        this.author.birthdate = moment(this.author.birthdate).format('YYYY/MM/DD')
      })
    }
  }
  uploadFile( ){
    this.imageFile = this.fileInputElement.nativeElement.files[0]
  }

  submit(){
    const data = new FormData()
    data.set('firstName',this.author.firstName)
    data.set('secondName',this.author.secondName)
    data.set('surname',this.author.surname)
    data.set('birthdate',this.author.birthdate)
    data.set('bio',this.author.bio)
    if(this.imageFile){
      data.set('image',this.imageFile)
    }
    this.authorsService.createNewAuthor(data).subscribe( data => {
      console.log("submit")
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success',
          didClose : () => this.router.navigate(['/authors'])
        })
    },(error)=>{
      console.log(error)
      Swal.fire({
        title : 'Opps',
        text : 'Something went wrong',
        icon : 'error'
      })
    }
    )
  }

  update(){
    const dataUpdate = new FormData()
    dataUpdate.set('firstName',this.author.firstName)
    dataUpdate.set('secondName',this.author.secondName)
    dataUpdate.set('surname',this.author.surname)
    dataUpdate.set('birthdate',this.author.birthdate)
    dataUpdate.set('bio',this.author.bio)
    if(this.imageFile){
      dataUpdate.set('image',this.imageFile)
    }
    this.authorsService.updateAuthor(this.author.id,dataUpdate).subscribe( data => {
      const {msg} = Object(data)
        Swal.fire({
          title : 'Great',
          text : msg,
          icon : 'success',
          didClose : () => this.router.navigate(['/authors'])
        })
    },(error)=>{
      console.log(error)
      Swal.fire({
        title : 'Opps',
        text : 'Something went wrong',
        icon : 'error'
      })
    }
    )
  }

}
