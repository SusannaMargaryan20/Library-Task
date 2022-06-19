import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../platform/api/books/books-service";
import {BookResModel} from "../../../platform/api/books/res/book-res-model";

@Component({
  selector: 'app-books-main',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  data: BookResModel[] = [];
  bookInitialData: BookResModel[] = [];
  pageSize: number = 20;
  pageIndex: number = 0;
  shownData: BookResModel[] = [];
  isManageBook: boolean = false;
  isShowMore: boolean = false;
  showMoreId: number | undefined;
  deleteId: number | undefined;
  isDeleteBook: boolean = false;
  editResModel: BookResModel | undefined | null;
  channel = new BroadcastChannel('books');

  constructor(
    private booksService: BooksService
  ) {
  }

  ngOnInit(): void {
    this.getBooksList();
    this.updateList();
  }

  showMoreFunctionality(item: BookResModel) {
    this.isShowMore = !this.isShowMore
    this.showMoreId = item.id
  }

  filterPages(e: { pageSize: number; pageIndex: number; }) {
    if (this.pageSize === 20) {
      this.shownData = this.data?.slice(e.pageSize * e.pageIndex, e.pageSize * (e.pageIndex + 1));
    }
  }

  showManageBookModal() {
    this.isManageBook = true;
  }

  openEditModal(item: BookResModel) {
    // @ts-ignore
    this.editResModel = item;
    this.isShowMore = false;
    this.isManageBook = true;
  }

  openDeleteBookModal(id: number) {
    this.isShowMore = false;
    this.deleteId = id;
    this.isDeleteBook = true;
  }

  closeManageBookModal() {
    this.isManageBook = false;
    this.editResModel = null;
  }

  closeDeleteBook() {
    this.isDeleteBook = false;
  }

  updateList() {
    this.channel.addEventListener ('message', (event) => {
      if (event.data) {
        this.getBooksList();
      }
    });
  }

  getBooksList() {
    this.booksService.getList()
      .subscribe((data) => {
        this.data = data;
        this.bookInitialData = Object.assign([], this.data);
        this.shownData = this.data?.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
      });
  }
}
