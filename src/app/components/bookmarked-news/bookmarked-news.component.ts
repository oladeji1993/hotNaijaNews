import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-bookmarked-news',
  templateUrl: './bookmarked-news.component.html',
  styleUrls: ['./bookmarked-news.component.scss']
})
export class BookmarkedNewsComponent implements OnInit  {
  constructor(
    private crudService: CrudService

  ) {

  }

  ngOnInit(){
    let newSources = 'cnn'
    this.crudService.getAllBookmarkedNews(newSources).subscribe((data:any)=>{
      console.log(data);
    })
  }
}
