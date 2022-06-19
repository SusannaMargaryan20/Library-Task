import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BooksService} from "../../../../platform/api/books/books-service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() bookId: number | undefined;
  @Output() close: EventEmitter<undefined> = new EventEmitter();
  @Output() update: EventEmitter<undefined> = new EventEmitter();
  channel = new BroadcastChannel('books');

  constructor(
    private booksService: BooksService,
  ) { }

  ngOnInit(): void {
  }

  save() {
    if (this.bookId) {
      this.booksService.delete(this.bookId).subscribe((data) => {
        if (data) {
          this.update.emit();
          this.channel.postMessage(true);
          this.close.emit();
        }
      })
    }
  }
}
