import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddPlayerComponent } from './add-player/add-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { InstructionsComponent } from './instructions/instructions.component';
import { LocalStorageService } from './service/local-stroage.service';
import { AddPlayerScoreDialog } from './add-score/add-player-score.dialog';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faFacebookMessenger, faLine, faLinkedinIn, faMix, faPinterestP, faRedditAlien, faTelegramPlane, faTumblr, faTwitter, faViber, faVk, faWhatsapp, faXing } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLink, faPrint, faSms } from '@fortawesome/free-solid-svg-icons';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

// const customConfig: ShareButtonsConfig = {
//   include: ['facebook', 'twitter', 'google'],
//   exclude: ['tumblr', 'stumble', 'vk'],
//   theme: 'modern-light',
//   gaTracking: true,
//   twitterAccount: 'twitterUsername'
// }

@NgModule({
  declarations: [
    AppComponent,
    AddPlayerComponent,
    InstructionsComponent,
    AddPlayerScoreDialog,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShareButtonsModule.withConfig({}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonToggleModule
  ],
  entryComponents: [
    AddPlayerScoreDialog
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library:FaIconLibrary) {
    library.addIcons(faTwitter, faFacebookF, faLinkedinIn, faPinterestP, faRedditAlien, faTumblr, faMix, faViber, faVk, faTelegramPlane, faFacebookMessenger, faWhatsapp, faXing, faLine, faSms, faEnvelope, faPrint, faLink);
  }
}
