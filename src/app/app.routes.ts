import { Routes } from '@angular/router';
import { AboutView } from './views/about/about.view';
import { HomeView } from './views/home/home.view';
import { NoteView } from './views/note/note.view';

export const routes: Routes = [
  { path: '', component: HomeView },
  { path: 'about', component: AboutView },
  { path: 'note/:id', component: NoteView }
];
