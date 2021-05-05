import { Component, Inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PlayerStatistics } from "../model/player-statistics";
import { LocalStorageService } from "../service/local-stroage.service";

export interface DialogData {
    players: Map<String, PlayerStatistics>;
}

@Component({
    selector: 'add-player-score-dialog',
    templateUrl: './add-player-score.dialog.html',
})
export class AddPlayerScoreDialog {

    private playersScoreValidators = [
        Validators.required,
        Validators.pattern('^([0-9]*5)|([0-9]*0)$')
    ];

    playerForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddPlayerScoreDialog>, private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private localStorage: LocalStorageService) {

        this.playerForm = this.fb.group({
            playersScore: this.fb.array([])
        });

        this.data.players!.forEach((value: PlayerStatistics, key: String) => {
            this.playersScore.push(this.fb.group({ point: [, this.playersScoreValidators], name: key }));
        });
        this.localStorage.setItem("players", JSON.stringify(Array.from(this.data.players.entries())));
        console.log('Immediate retrival', this.localStorage.getItem("players"));
    }

    get playersScore() {
        return this.playerForm.get('playersScore') as FormArray;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addCurrentRoundPoints() {
        
        let countZero = 0;
        this.playersScore.value.forEach((data: any) => {
            if (data.point == 0) {
                countZero = countZero + 1;
            }
            
        });
        if (countZero > 1) {
            this.playerForm.controls['playersScore'].setErrors({'invalid': true});
            return;
        }

        this.playersScore.value.forEach((data: any) => {
          console.log(JSON.stringify(data));
          this.data.players.get(data.name);
          let playerStatistics: PlayerStatistics =
            this.data.players.get(data.name) ?
              this.data.players.get(data.name)! : new PlayerStatistics();
          if (data.point < 50) {
            playerStatistics.currentPhase = playerStatistics.currentPhase + 1;
          }
          playerStatistics.allPoints.push(data.point);
          playerStatistics.totalPoint = +playerStatistics.totalPoint + +data.point;
    
          this.data.players.set(data.name, playerStatistics);
        });
    
        this.playersScore.clear();
        // this.populatePlayerScoreForm();
        this.localStorage.setItem("players", JSON.stringify(Array.from(this.data.players.entries())));
        
        this.dialogRef.close();
      }

}