import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthorService} from "../../../../platform/api/author/author-service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() authorId: number | undefined | null;
  @Output() close: EventEmitter<undefined> = new EventEmitter();
  @Output() update: EventEmitter<undefined> = new EventEmitter();
  channel = new BroadcastChannel('author');

  constructor(
    private authorService: AuthorService,
  ) { }

  ngOnInit(): void {
  }

  save() {
    if (this.authorId) {
      this.authorService.delete(this.authorId).subscribe((data) => {
        if (data) {
          this.close.emit();
          this.channel.postMessage(true);
          this.update.emit();
        }
      })
    }
  }
}
