import { Component, Inject } from '@angular/core';
import { faUser, faPowerOff, faCalendar, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { SurveyService } from '../../../survey.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdown,
    NgbCollapse,
    AsyncPipe,
    NgIf,
    RouterLink,
  ],
})
export class NavBarComponent {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;
  faCalendar = faCalendar;
  faHome = faHome;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.surveyService.authUser(user.sub).subscribe((response) => {
          if (!response.surveyCompleted) {
            this.router.navigate(['/survey-form']);
          }
        });
      }
    });
  }
  

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}