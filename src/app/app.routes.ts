import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {JournalComponent} from "./pages/journal/journal.component";
import {ForumComponent} from "./pages/forum/forum.component";

export const routes: Routes = [
  {path : '',component : WelcomeComponent},
  {path : 'journal', component : JournalComponent},
  {path : 'forum', component : ForumComponent}

];
