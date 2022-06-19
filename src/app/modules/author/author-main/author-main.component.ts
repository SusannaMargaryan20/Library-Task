import { Component, OnInit } from '@angular/core';
import {AuthorService} from "../../../platform/api/author/author-service";
import {AuthorResModel} from "../../../platform/api/author/res/author-res-model";

@Component({
  selector: 'app-author-main',
  templateUrl: './author-main.component.html',
  styleUrls: ['./author-main.component.scss']
})
export class AuthorMainComponent implements OnInit {
  data: AuthorResModel[] = [];
  authorInitialData: AuthorResModel[]=[];
  pageSize: number = 10;
  pageIndex: number = 0;
  shownData: AuthorResModel[] = [];
  isShowMore: boolean = false;
  showMoreId: number | undefined;
  editResModel: AuthorResModel | undefined | null;
  isManageAuthor: boolean = false;
  deleteId: number | undefined | null;
  isDeleteAuthor: boolean = false;
  channel = new BroadcastChannel('author');

  constructor(
    private authorService: AuthorService,
  ) { }

  ngOnInit(): void {
    this.getAuthorList();
  }

  showMoreFunctionality(item: AuthorResModel) {
    this.isShowMore = !this.isShowMore
    this.showMoreId = item.id
  }

  openAddNewAuthor() {
    this.isManageAuthor = true;
  }

  openEditModal(item: AuthorResModel) {
    // @ts-ignore
    this.editResModel = item;
    this.isShowMore = false;
    this.isManageAuthor = true;
  }

  updateList() {
    this.channel.addEventListener ('message', (event) => {
      if (event.data) {
        this.getAuthorList();
      }
    });
  }

  openDeleteAuthorModal(id: number) {
    this.isShowMore = false;
    this.deleteId = id;
    this.isDeleteAuthor = true;
  }

  closeManageAuthorModal() {
    this.isManageAuthor = false;
    this.editResModel = null;
  }

  closeDeleteAuthor() {
    this.isDeleteAuthor = false;
    this.deleteId = null;
  }

  filterPages(e: { pageSize: number; pageIndex: number; }) {
    if (this.pageSize === 10) {
      this.shownData = this.data?.slice(e.pageSize * e.pageIndex, e.pageSize * (e.pageIndex + 1));
    }
  }

  getAuthorList() {
    this.authorService.getList()
      .subscribe((data) => {
        this.data = data;
        this.authorInitialData = Object.assign([], this.data);
        this.shownData = this.data?.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
      });
  }
}
