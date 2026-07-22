import { Routes } from '@angular/router';
import { LandscapeComponent } from './pages/landscape.component';

export const routes: Routes = [
  { path: '', component: LandscapeComponent, title: 'Agent-self landscape' },
  { path: '**', redirectTo: '' },
];
