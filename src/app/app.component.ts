import { Component, NgZone } from '@angular/core';
import { LocalStorageService } from './service/local-stroage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hamburguerX', [
      state('hamburguer', style({})),
      state('topX', style({
        transform: 'rotate(45deg)',
        transformOrigin: 'left',
        margin: '6px'
      })),
      state('hide', style({
        opacity: 0
      })),
      state('bottomX', style({
        transform: 'rotate(-45deg)',
        transformOrigin: 'left',
        margin: '6px'
      })),
      transition('* => *', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class AppComponent {
  // show = 11;
  title = 'Phase 10';
  isCurrentlyPlaying: boolean = false;

  constructor(private localStorage: LocalStorageService, private ngZone: NgZone) {
    this.localStorage.getItem("players").subscribe((data) => {
      // this.ngZone.run(() => {
        if (data != null) {
          this.isCurrentlyPlaying = true;
        } else {
          this.isCurrentlyPlaying = false;
        }
      // });
    });
  }

  show() {
    return 11;
  }

  isHamburguer = true;
  onClick() {
    this.isHamburguer = !this.isHamburguer;
  }

}


