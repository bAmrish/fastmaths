import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../user/models/user.interface';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Fast Maths';
  loggedInUser: User | null = null;

  menuItems: MenuItem[] = [
    {label: 'My Profile', url: '/user', icon: 'pi pi-user-edit'},
    {label: 'Logout', url: '/logout', icon: 'pi pi-sign-out'},
  ];

  routerLinks: { text: string, command: string[] }[] = [
    {text: 'My Tests', command: ['paper']},
    {text: 'Take Test', command: ['paper', 'config']},
    {text: 'Create Test', command: ['paper', 'config', 'new']},
  ]
  @Output() menuClicked = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    this.authService.getLoggedInUser().subscribe(user => {
      if(user){
        this.menuItems[0].url = `/user/${user?.id}`;
      }
      this.loggedInUser = user
    })
  }

  onMenuClicked() {
    this.menuClicked.emit();
  }
}
