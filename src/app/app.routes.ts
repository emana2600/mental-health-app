import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {JournalComponent} from "./pages/journal/journal.component";
import {ForumComponent} from "./pages/forum/forum.component";
import {DepressionComponent} from "./pages/depression/depression.component";
import {ProfilImageComponent} from "./pages/profil-image/profil-image.component";

export const routes: Routes = [
  {path : '',component : WelcomeComponent},
  {path : 'journal', component : JournalComponent},
  {path : 'forum', component : ForumComponent},
  { path : "anxiety",component : DepressionComponent},
  {path: "select_profil",component:ProfilImageComponent}

];
