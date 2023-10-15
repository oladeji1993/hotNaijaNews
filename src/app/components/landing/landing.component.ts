import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  allArticles: any = [];
  search: boolean = false
  loader: boolean = false;
  emptyResponse: boolean = false
  selectedOption: string = 'cnn';
  btnLoader: number | null = null;
  constructor(
    private crudService: CrudService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getNews();
    // this.allSources()
  }

  // allSources(){
  //   this.crudService.allSources().subscribe((response:any)=>{
  //   })
  // }

  getNews() {
    this.loader = true;
    this.crudService
      .getAllnews(this.selectedOption)
      .subscribe((response: any) => {
        this.allArticles = response.articles;
        this.loader = false;
        if(this.allArticles.length == 0){
          this.emptyResponse = true
        }   
      });
  }

  searchByCategory() {
    if (this.selectedOption == '') {
      this.toastr.error('Error', 'Select a valid Category');
    } else {
      this.search = true;
      this.crudService
        .getAllnews(this.selectedOption)
        .subscribe((response: any) => {
          this.allArticles = response.articles;
          this.search = false;
          if(this.allArticles.length == 0){
            this.emptyResponse = true
          }  
        }, (err:any)=>{
          this.search = false;
          if (err.error.code == 400) {
            this.toastr.info('', err.error.message);
          } else {
            this.toastr.error('Error', err.error.message);
          }
        });
    }
  }

  bookmarkNews(item: any, index: number) {
    let data = {
      bookmarkId: item.source.id,
      author: item.author,
      content: item.content,
      description: item.description,
      title: item.title,
      image: item.urlToImage,
      publishedDate: item.publishedAt,
    };
    this.btnLoader = index;
    this.crudService.bookmarkNews(data).subscribe(
      (response: any) => {
        if (response.code == 200) {
          this.toastr.success(response.message, 'Success');
          this.btnLoader = null;
        } else {
          this.toastr.error('Error', response.message);
          this.btnLoader = null;
        }
      },
      (err) => {
        this.btnLoader = null;
        if (err.error.code == 400) {
          this.toastr.info('', err.error.message);
        } else {
          this.toastr.error('Error', err.error.message);
        }
      }
    );
  }
}
