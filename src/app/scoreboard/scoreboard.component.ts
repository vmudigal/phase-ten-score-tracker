import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPlayerScoreDialog } from '../add-score/add-player-score.dialog';
import { PlayerStatistics } from '../model/player-statistics';
import { LocalStorageService } from '../service/local-stroage.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  pipe = new DatePipe('en-US');
  date = new Date();
  myFormattedDate = this.pipe.transform(this.date, 'dd-MMM-yyyy, hh:mm a');

  players!: Map<String, PlayerStatistics>;

  currentRound = 1;
  breakpoint: number = 1;
  boardview = "grid";

  constructor(private router: Router,
    private localStorage: LocalStorageService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.players = new Map<String, PlayerStatistics>();
    // if(this.localStorage.getItem("players") != null) {
    //   this.players = new Map(JSON.parse(this.localStorage.getItem("players")!));
    // }

    // "[[\"P\",{\"currentPhase\":1,\"totalPoint\":0,\"allPoints\":[]}],[\"G\",{\"currentPhase\":1,\"totalPoint\":0,\"allPoints\":[]}]]"
    this.localStorage.getItem("players").subscribe((datas) => {
      console.log('datas', datas);
      if (datas != null) {
        JSON.parse(datas).forEach((data:any) => {
          console.log('data',data);
          this.players.set(data[0], data[1]);
        });
      } else if (history.state.data === undefined) {
        this.router.navigate(['/']);
      } else {
        history.state.data.playersList.forEach((player: String) => {
          this.players.set(player, new PlayerStatistics());
          console.log('this.players inside successful completion: ', this.players)
        });
        this.localStorage.setItem("players", JSON.stringify(Array.from(this.players.entries())));
      }
    });


    // For testing
    // this.players.set("Player1", new PlayerStatistics());
    // this.players.set("Player2", new PlayerStatistics());
    // this.players.set("Player3", new PlayerStatistics());
    // this.players.set("Player4", new PlayerStatistics());
    // this.players.set("Player5", new PlayerStatistics());
    // this.players.set("Player6", new PlayerStatistics());

    this.onResize(window.innerWidth);
  }
  
  onResize(event:any) {
    // X-Small
    if (window.innerWidth <= 576) {
      this.breakpoint = 1;
    } 
    // Small
    else if(window.innerWidth <= 768) {    
      this.breakpoint = 2;
    } 
    // Medium
    else if (window.innerWidth <= 992) {   
      this.breakpoint = 3;
      if(this.players.size < 3) {
        this.breakpoint = this.players.size;
      }
    } 
    // Large
    else if(window.innerWidth <= 1200) {
      this.breakpoint = 4;
      if(this.players.size < 4) {
        this.breakpoint = this.players.size;
      }
    } 
    // Extra large and Extra extra large
    else if(window.innerWidth > 1200) {
      this.breakpoint = 6;
      if(this.players.size < 6) {
        this.breakpoint = this.players.size;
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerScoreDialog, {
      // width: '250px',
      disableClose: true,
      data: { players: this.players }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  get playersCount() { return this.players.size; }

  get playerNames() { return Array.from(this.players.keys()); }

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
