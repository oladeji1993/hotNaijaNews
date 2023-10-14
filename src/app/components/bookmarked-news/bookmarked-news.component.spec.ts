import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedNewsComponent } from './bookmarked-news.component';

describe('BookmarkedNewsComponent', () => {
  let component: BookmarkedNewsComponent;
  let fixture: ComponentFixture<BookmarkedNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookmarkedNewsComponent]
    });
    fixture = TestBed.createComponent(BookmarkedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
