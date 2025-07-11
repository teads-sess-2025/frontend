import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from "@angular/core";
import { Router } from "@angular/router";
import { isDefined } from "src/app/helpers/common.helpers";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'sess-note-view',
    imports: [FormsModule, CommonModule],
    templateUrl: 'note.view.html',
    styleUrl: 'note.view.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.sess-loading-overlay]': 'isLoading()'
    }
})
export class NoteView {
    id = input<string>();

    isLoading = signal<boolean>(false);
    isSaving = signal<boolean>(false);
    isDeleting = signal<boolean>(false);
    note = signal<Note>({ title: '', text: '' });

    private service: NotesService = inject(NotesService);
    private router = inject(Router)


    constructor() {
        effect(() => {
          if (this.id() && this.id() !== 'new') {
                this.service.getNote(parseInt(this.id(), 10), this.isLoading).then(
                    note => this.note.set(note)
                );
          }
        })
    }

    saveChanges() {
        if (isDefined(this.note().id)) {
            this.service.updateNote(this.note(), this.isSaving).then(
                note => this.note.set(note),
                err => alert('An error occured while saving :('),
            );
        } else {
            this.service.createNote(this.note(), this.isSaving).then(
                note => this.router.navigateByUrl(`/note/${note.id}`),
                err => alert('An error occured while saving :('),
            );
        }
    }

    deleteNote() {
        if (isDefined(this.note().id) && window.confirm("Are you sure you want to delete this note?")) {
            this.service.deleteNote(this.note().id, this.isDeleting).then(
                () => this.router.navigateByUrl('/'),
                err => alert('An error occured while deleting :('),
            );
        }
    }

    updateTitle(title: string) {
      this.note.update(current => ({ ...current, title }));
    }
  
    updateText(text: string) {
      this.note.update(current => ({ ...current, text }));
    }
}
