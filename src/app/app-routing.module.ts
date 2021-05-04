import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  { path: '', component: AddPlayerComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'instructions', component: InstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
