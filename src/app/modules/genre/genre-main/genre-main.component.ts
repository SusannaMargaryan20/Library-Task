import { Component, OnInit } from '@angular/core';
import {GenresService} from "../../../platform/api/genres/genres-service";
import {GenresResModel} from "../../../platform/api/genres/res/genres-res-model";

@Component({
  selector: 'app-genre-main',
  templateUrl: './genre-main.component.html',
  styleUrls: ['./genre-main.component.scss']
})
export class GenreMainComponent implements OnInit {
  data: GenresResModel[] = [];
  genreInitialData: GenresResModel[]=[];
  pageSize: number = 10;
  pageIndex: number = 0;
  shownData: GenresResModel[] = [];
  channel = new BroadcastChannel('genre');
  isDeleteGenre: boolean = false;
  deleteId: number | undefined | null;
  isManageNewGenre: boolean = false;
  editResModel: GenresResModel | undefined | null;
  isShowMore: boolean = false;
  showMoreId: number | undefined;
  constructor(
    private genreService: GenresService
  ) { }

  ngOnInit(): void {
    this.getGenreList();
  }

  updateList() {
    this.channel.addEventListener ('message', (event) => {
      if (event.data) {
        this.getGenreList();
      }
    });
  }

  showMoreFunctionality(item: GenresResModel) {
    this.isShowMore = !this.isShowMore
    this.showMoreId = item.id
  }

  openAddNewGenre() {
    this.isManageNewGenre = true;
  }

  openEditModal(item: GenresResModel) {
    this.editResModel = item;
    this.isShowMore = false;
    this.isManageNewGenre = true;
  }

  openDeleteGenreModal(id: number) {
    this.isShowMore = false;
    this.deleteId = id;
    this.isDeleteGenre = true;
  }

  closeManageGenre() {
    this.isManageNewGenre = false;
  }

  closeDeleteGenre() {
    this.isDeleteGenre = false;
  }

  filterPages(e: { pageSize: number; pageIndex: number; }) {
    if (this.pageSize === 10) {
      this.shownData = this.data?.slice(e.pageSize * e.pageIndex, e.pageSize * (e.pageIndex + 1));
    }
  }


  getGenreList() {
    this.genreService.getList().subscribe((data) => {
      if (data.length) {
        this.data = data;
        this.genreInitialData = Object.assign([], this.data);
        this.shownData = this.data?.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
      }
    });
  }
}
