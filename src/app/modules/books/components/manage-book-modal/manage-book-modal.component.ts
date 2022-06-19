import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../../../platform/api/books/books-service";
import {GenresService} from "../../../../platform/api/genres/genres-service";
import {GenresResModel} from "../../../../platform/api/genres/res/genres-res-model";
import {MatSelectChange} from "@angular/material/select";
import {AuthorService} from "../../../../platform/api/author/author-service";
import {AuthorResModel} from "../../../../platform/api/author/res/author-res-model";
import {BookResModel} from "../../../../platform/api/books/res/book-res-model";
import {ManageBookReqModel} from "../../../../platform/api/books/req/manage-book-req-model";

@Component({
  selector: 'app-manage-book-modal',
  templateUrl: './manage-book-modal.component.html',
  styleUrls: ['./manage-book-modal.component.scss']
})
export class ManageBookModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  channel = new BroadcastChannel('books');
  @Input() set data(value: BookResModel | undefined | null) {
    if (value) {
      this.bookId = value.id;
      this.getAuthorList();
      this.manageBookReqModel.patchValue({
        author: value.author,
        authorId: value.authorId,
        genreId: value.genreId,
        name: value.name,
        genre: value.genre,
        imageLink: value.imageLink,
        link: value.link,
      });
    }
  }
  manageBookReqModel: FormGroup = new FormGroup({
    author: new FormControl('',[Validators.required, Validators.minLength(2)]),
    authorId: new FormControl(null, [Validators.required, Validators.min(1)]),
    genreId: new FormControl(null,[Validators.required, Validators.min(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    genre: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    imageLink: new FormControl(''),
    link: new FormControl('',[Validators.required, Validators.minLength(2)]),
  });

  bookId: number | undefined;
  genreList: GenresResModel[] = [];
  authorList: AuthorResModel[] = [];

  constructor(
    private bookService: BooksService,
    private genreService: GenresService,
    private authorService: AuthorService,
  ) {
  }

  ngOnInit(): void {
    this.getGenreList();
  }

  handleSave() {
    console.log(this.manageBookReqModel)
    if (this.manageBookReqModel.valid) {
      if (this.bookId) {
        this.edit();
      } else {
        this.create();
      }
    } else {
      this.validateAllFormFields(this.manageBookReqModel);
    }
  }

  changePath(path) {
    this.manageBookReqModel.get('imageLink').setValue(path[0].name);
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
    const data: ManageBookReqModel = this.manageBookReqModel.value;
    data.imageLink = '';
    this.bookService.create(data).subscribe((data) => {
      if (data) {
        this.close.emit();
        this.channel.postMessage(true);
        this.update.emit();
      }
    });
  }

  edit() {
    const data: ManageBookReqModel = this.manageBookReqModel.value;
    this.bookService.update(this.bookId, data).subscribe((data) => {
      if (data) {
        this.close.emit();
        this.channel.postMessage(true);
        this.update.emit();
      }
    });
  }
  checkSelectGenre(type: MatSelectChange) {
    if (type.value) {
      const genreId = this.genreList.find(el => el.name === type.value);
      this.manageBookReqModel.get('genreId')?.patchValue(genreId.id);
      this.getAuthorList();
    }
  }

  checkSelectAuthor(type: MatSelectChange) {
    if (type.value) {
      const authorId = this.authorList.find(el => (el.firstName + ' ' + el.lastName) === type.value);
      this.manageBookReqModel.get('authorId')?.patchValue(authorId.id);
    }
  }


  getAuthorList() {
    this.authorService.getList().subscribe((data) => {
      if (data && data.length) {
        this.authorList = data;
      }
    });
  }

  getGenreList() {
    this.genreService.getList().subscribe((data) => {
      if (data && data.length) {
        this.genreList = data;
      }
    });
  }

}
