import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GenresService} from "../../../../platform/api/genres/genres-service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() genreId: number | undefined | null;
  @Output() close: EventEmitter<undefined> = new EventEmitter();
  @Output() update: EventEmitter<undefined> = new EventEmitter();
  channel = new BroadcastChannel('genre');

  constructor(
    private genreService: GenresService,
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    if (this.genreId) {
      this.genreService.delete(this.genreId).subscribe((data) => {
        if (data) {
          this.update.emit();
          this.channel.postMessage(true);
          this.close.emit();
        }
      })
    }
  }
}
