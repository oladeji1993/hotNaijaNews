import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  allArticles: any = [];
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.getNews();
    // this.allSources()
  }

  // allSources(){
  //   this.crudService.allSources().subscribe((response:any)=>{
  //   })
  // }

  getNews() {
    let newSources = 'cnn';
    this.crudService.getAllnews(newSources).subscribe((response: any) => {
      this.allArticles = response.articles;
      console.log(response);
    });
  }

  bookmarkNews(item: any) {
    console.log(item);

    let source = item.source.name;
    this.crudService.bookmarkNews(source).subscribe((response: any) => {
      console.log(response);
    });
  }
}
