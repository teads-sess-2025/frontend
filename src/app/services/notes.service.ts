import { inject, Injectable, WritableSignal } from "@angular/core";
import { Observable, of } from "rxjs";
import { Note } from "../types/note";
import { HttpClient } from '@angular/common/http';
import { getDefinedProps } from "../helpers/common.helpers";
import { NOTES_BASE_URL } from "./notes-service.config";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class NotesService extends BaseService {
    private http = inject(HttpClient);

    listNotes(keyword?: string, loadingIndicator?: WritableSignal<boolean>): Promise<Note[]> {
        const queryParams = getDefinedProps({ keyword });

        return this.callService(
            this.http.get<Note[]>(
                NOTES_BASE_URL,
                { params: queryParams }
            ),
            loadingIndicator
        );
    }

    getNote(id: number, loadingIndicator?: WritableSignal<boolean>): Promise<Note> {
        return this.callService(
            this.http.get<Note>(
                `${NOTES_BASE_URL}/${id}`
            ),
            loadingIndicator
        );
    }

    createNote(note: Note, loadingIndicator?: WritableSignal<boolean>): Promise<Note> {
        return this.callService(
            this.http.post<Note>(
                NOTES_BASE_URL,
                note
            ),
            loadingIndicator
        );
    }

    updateNote(note: Note, loadingIndicator?: WritableSignal<boolean>): Promise<Note> {
        return this.callService(
            this.http.put<Note>(
                `${NOTES_BASE_URL}/${note.id}`,
                note
            ),
            loadingIndicator
        );
    }

    deleteNote(id: number, loadingIndicator?: WritableSignal<boolean>): Promise<void> {
        return this.callService(
            this.http.delete<void>(
                `${NOTES_BASE_URL}/${id}`,
            ),
            loadingIndicator
        );
    }
}
