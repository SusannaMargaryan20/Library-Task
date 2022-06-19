import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {GenresResModel} from "../../../../platform/api/genres/res/genres-res-model";
import {GenresService} from "../../../../platform/api/genres/genres-service";
import {AuthorService} from "../../../../platform/api/author/author-service";
import {AuthorResModel} from "../../../../platform/api/author/res/author-res-model";
import {MatSelectChange} from "@angular/material/select";
import {ManageGenresReqModel} from "../../../../platform/api/genres/req/manage-genres-req-model";

@Component({
  selector: 'app-manage-genre-modal',
  templateUrl: './manage-genre-modal.component.html',
  styleUrls: ['./manage-genre-modal.component.scss']
})
export class ManageGenreModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();

  @Input() set data(value: GenresResModel | undefined | null) {
    if (value) {
      this.genreId = value.id;
      this.manageGenreModel.patchValue({
        author: value.author,
        authorId: value.authorId,
        name: value.name,
        bookName: value.bookName,
        short_description: value.short_description,
      });
    }
  }
  channel = new BroadcastChannel('genre');
  manageGenreModel : FormGroup = new FormGroup({
    author: new FormControl('',[Validators.required, Validators.minLength(2)]),
    authorId: new FormControl(null, [Validators.required, Validators.min(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    short_description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    bookName: new FormControl('',[Validators.required, Validators.minLength(2)]),
  });
  genreId: number | undefined;
  authorList: AuthorResModel[] = [];

  constructor(
    private genreService: GenresService,
    private authorService: AuthorService,
  ) {
  }

  ngOnInit(): void {
    this.getAuthorList();
  }

  handleSave() {
    if (this.manageGenreModel.valid) {
      if (this.genreId) {
        this.edit();
      } else {
        this.create();
      }
    } else {
      this.validateAllFormFields(this.manageGenreModel);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  create() {
    const data: ManageGenresReqModel = this.manageGenreModel.value;
    this.genreService.create(data).subscribe((data) => {
      if (data) {
        this.close.emit();
        this.channel.postMessage(true);
        this.update.emit();
      }
    });
  }

  edit() {
    const data: ManageGenresReqModel = this.manageGenreModel.value;
    this.genreService.update(this.genreId, data).subscribe((data) => {
      if (data) {
        this.close.emit();
        this.channel.postMessage(true);
        this.update.emit();
      }
    });
  }

  checkSelectAuthor(type: MatSelectChange) {
    if (type.value) {
      const authorId = this.authorList.find(el => (el.firstName + ' ' + el.lastName) === type.value);
      this.manageGenreModel.get('authorId')?.patchValue(authorId.id);
    }
  }

  getAuthorList() {
    this.authorService.getList().subscribe((data) => {
      if (data && data.length) {
        this.authorList = data;
      }
    });
  }
}
