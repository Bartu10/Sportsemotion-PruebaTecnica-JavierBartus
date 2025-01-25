import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [ApiService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent {

  constructor(private api: ApiService, private router: Router) { }

  users: any = [];

  ngOnInit(): void {
    this.api.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  goToUserTasks(user: any){

    localStorage.setItem('user', JSON.stringify(user));

    const userId = user.id;

    this.router.navigate(['/tasks', userId]);

  }


  openLocation(lat: string, lng: string): void {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  }


}
