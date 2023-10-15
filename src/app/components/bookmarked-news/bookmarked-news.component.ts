import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bookmarked-news',
  templateUrl: './bookmarked-news.component.html',
  styleUrls: ['./bookmarked-news.component.scss']
})
export class BookmarkedNewsComponent implements OnInit  {
  allBookmarked: any = []
  loader:boolean = false;
  btnLoader: number | null = null;
  emptyResponse: boolean = false
  constructor(
    private crudService: CrudService,
    private toastr: ToastrService

  ) {

  }

  ngOnInit(){
  this.getAllbookedMarkedItems() 
 }

  getAllbookedMarkedItems(){
    this.loader = true
    this.crudService.getAllBookmarkedNews().subscribe((data:any)=>{
      this.allBookmarked = data.data  
      if(this.allBookmarked.length == 0){
        this.emptyResponse = true
      }       
      this.loader = false
    }, err =>{
      console.log(err);
      this.loader = false
    })
  }

  deleteItems(item: any, index: number){
    console.log(item);
    let id = item._id
    this.btnLoader = index
    this.crudService.deleteBookmarkedNews(id).subscribe((response:any)=>{
      if(response.code == 200){
        this.toastr.success(response.message, 'Success');
        this.btnLoader = null;
        this.crudService.getAllBookmarkedNews().subscribe((data:any)=>{
          this.allBookmarked = data.data 
          if(this.allBookmarked.length == 0){
            this.emptyResponse = true
          }     
        }, err =>{
          console.log(err);
        })
      }else{
        this.toastr.error('Error', response.message);
        this.btnLoader = null
      }
    },err =>{
      this.btnLoader = null
      this.toastr.error('Error', err.error.message);
    });
  }
}
