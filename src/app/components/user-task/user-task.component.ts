import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-task',
    imports: [HttpClientModule, CommonModule, RouterModule],
    providers: [ApiService],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.scss'
})
export class UserTaskComponent {


    constructor(private api: ApiService, private router: Router) { }

    users: any = [];
    tasks: any = []


    ngOnInit(): void {




      const userId = this.router.url.split('/').pop();
      if (userId) {
        this.api.getUserTasks(userId).subscribe((tasks: any) => {
          this.tasks = tasks;
        });
      }

      this.api.getUsers().subscribe((data: any) => {
        this.users = data;
      });
    }

    toggleTaskStatus(task: any): void {
      task.completed = !task.completed;
    }




}
