import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  private playersScoreValidators = [
    Validators.required,
    Validators.pattern('^([0-9]?5)|([0-9]?0)$')
  ];

  players!: Map<String, PlayerStatistics>;

  currentRound = 1;
  playerForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.playerForm = this.fb.group({
      playersScore: this.fb.array([])
    });

    // For testing
    // this.players.set("Player1", new PlayerStatistics());
    // this.players.set("Player2", new PlayerStatistics());
    // this.players.set("Player3", new PlayerStatistics());
    // this.players.set("Player4", new PlayerStatistics());
    // this.players.set("Player5", new PlayerStatistics());
    // this.players.set("Player6", new PlayerStatistics());

    
    if (history.state.data === undefined) {
      this.router.navigate(['/']);
    } else {
      this.players = new Map<String, PlayerStatistics>();
      history.state.data.playersList.forEach((player: String) => {
        this.players.set(player, new PlayerStatistics());
        console.log(this.playersCount);
      });
    }

    this.populatePlayerScoreForm();
  }

  get playersScore() {
    return this.playerForm.get('playersScore') as FormArray;
  }

  get playersCount() { return this.players.size; }

  get playerNames() { return Array.from(this.players.keys()); }

  populatePlayerScoreForm() {
    this.players!.forEach((value: PlayerStatistics, key: String) => {
      this.playersScore.push(this.fb.group({ point: [, this.playersScoreValidators], name: key }));
    });
  }

  addCurrentRoundPoints() {

    this.currentRound = this.currentRound + 1;

    this.playersScore.value.forEach((data: any) => {
      console.log(JSON.stringify(data));
      this.players.get(data.name);
      let playerStatistics: PlayerStatistics =
        this.players.get(data.name) ?
          this.players.get(data.name)! : new PlayerStatistics();
      if (data.point < 50) {
        playerStatistics.currentPhase = playerStatistics.currentPhase + 1;
      }
      playerStatistics.allPoints.push(data.point);
      playerStatistics.totalPoint = +playerStatistics.totalPoint + +data.point;

      this.players.set(data.name, playerStatistics);
    });

    this.playersScore.clear();
    this.populatePlayerScoreForm();
  }

  horizontalLineNeeded(scoreIndex: number): boolean {
    return scoreIndex % this.playersCount == 0 ? true : false;
  }

  totalPoint(allPoints: number[]): number {
    let totalPoint = 0;
    allPoints.forEach(point => {
      totalPoint = totalPoint + point;
    });
    return totalPoint;
  }

}

export class PlayerStatistics {
  currentPhase: number = 1;
  totalPoint: number = 0;
  allPoints: number[] = [];
}
