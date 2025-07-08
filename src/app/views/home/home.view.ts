import { ChangeDetectionStrategy, Component, effect, inject, signal } from "@angular/core";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'sess-home-view',
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: 'home.view.html',
    styleUrl: 'home.view.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.sess-loading-overlay]': 'isLoading()'
    }
})
export class HomeView {
    notes = signal<Note[]>([]);
    isLoading = signal<boolean>(false);

    private service: NotesService = inject(NotesService);

    constructor() {
        effect(() => {
            this.service.listNotes(null, this.isLoading).then(
                notes => this.notes.set(notes)
            );
        });
    }
}
