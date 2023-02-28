import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { TitatoPlaygroundComponent } from './components/titato-playground/titato-playground.component';

const routes: Routes = [
  {
    path: '',
    component: GameListComponent,
  },
  {
    path: 'game/:gameId',
    component: TitatoPlaygroundComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
