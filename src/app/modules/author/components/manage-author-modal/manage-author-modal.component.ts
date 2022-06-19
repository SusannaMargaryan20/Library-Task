import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorService} from "../../../../platform/api/author/author-service";
import {AuthorResModel} from "../../../../platform/api/author/res/author-res-model";
import {GenresService} from "../../../../platform/api/genres/genres-service";
import {GenresResModel} from "../../../../platform/api/genres/res/genres-res-model";
import {MatSelectChange} from "@angular/material/select";
import {ManageAuthorReqModel} from "../../../../platform/api/author/req/manage-author-req-model";

@Component({
  selector: 'app-manage-author-modal',
  templateUrl: './manage-author-modal.component.html',
  styleUrls: ['./manage-author-modal.component.scss']
})
export class ManageAuthorModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();

  @Input() set data(value: AuthorResModel | undefined | null) {
    if (value) {
      this.authorId = value.id;
      this.manageAuthorModel.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        bornDate: value.bornDate? new Date(value.bornDate) : null,
        dieDate: value.dieDate? new Date(value.dieDate) : null,
        genreId: value.genreId,
        genre: value.genre,
        image: value.image,
        bookName: value.bookName,
      });
    }
  }
  channel = new BroadcastChannel('author');

  manageAuthorModel: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    bornDate: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    dieDate: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    genreId: new FormControl(null,[Validators.required, Validators.min(1)]),
    genre: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    image: new FormControl(''),
    bookName: new FormControl('',[Validators.required, Validators.minLength(2)]),
  });
  authorId: number | undefined;
  genreList: GenresResModel[] = [];

  constructor(
    private authorService: AuthorService,
    private genreService: GenresService,
  ) {
  }

  ngOnInit(): void {
    this.getGenreList();
  }


  handleSave() {
    if (this.manageAuthorModel.valid) {
      if (this.authorId) {
        this.edit();
      } else {
        this.create();
      }
    } else {
      this.validateAllFormFields(this.manageAuthorModel);
    }
  }


  changePath(path) {
    this.manageAuthorModel.get('imageLink').setValue(path[0].name);
  }

  create() {
    const data: ManageAuthorReqModel = this.manageAuthorModel.value;
    data.imageLink = '';
    this.authorService.create(data).subscribe((data) => {
      if (data) {
        this.close.emit();
        this.channel.postMessage(true);
        this.update.emit();
      }
    });
  }

  edit() {
    const data: ManageAuthorReqModel = this.manageAuthorModel.value;
    this.authorService.update(this.authorId, data).subscribe((data) => {
      if (data) {
        this.close.emit();
        this.channel.postMessage(true);
        this.update.emit();
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

  checkSelectGenre(type: MatSelectChange) {
    if (type.value) {
      const genreId = this.genreList.find(el => el.name === type.value);
      this.manageAuthorModel.get('genreId')?.patchValue(genreId.id);
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

}
