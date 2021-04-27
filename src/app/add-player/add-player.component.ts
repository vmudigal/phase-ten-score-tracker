import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  private playerValidators = [
    Validators.required,
    Validators.pattern('[a-zA-z]*')
  ];

  playerForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.playerForm = this.formBuilder.group({
      players: this.formBuilder.array([
        this.formBuilder.group({ player: ['', this.playerValidators] }),
        this.formBuilder.group({ player: ['', this.playerValidators] })
      ])
    });
  }

  get players() {
    return this.playerForm.get('players') as FormArray;
  }

  get playerCount() {
    return this.players.length;
  }

  addPlayer() {
    this.players.push(this.formBuilder.group({ player: ['', this.playerValidators] }));
  }

  removePlayer() {
    this.players.removeAt(this.playerCount - 1);
  }

  play() {
    if (this.playerForm.invalid) {
      // do nothing
    } else {
      console.log('Inside', this.players.value);
      let playerList: any[]= []; 
      this.players.value.forEach((data:any) => {
        playerList.push(data.player.toUpperCase());
      })
      this.goToScoreBoard(playerList);
    }
  }

  goToScoreBoard(playersList: any): void {
    this.router.navigate(['/scoreboard'], { state: { data: { playersList } } });
  }

}