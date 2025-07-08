import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/types/note";
import { BaseView } from "../base/base.view";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'fsss-home-view',
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: './home.view.html',
    styleUrls: ['./home.view.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeView extends BaseView<{ notes: Note[] }> implements OnInit, OnDestroy {
    private service: NotesService = inject(NotesService);

    constructor() {
        super();
        this.uiData$ = new BehaviorSubject({ notes: [] });
    }

    ngOnInit() {
        this.callService(this.service.listNotes()).then(
            notes => this.updateUiData({ notes })
        );
    }
}
