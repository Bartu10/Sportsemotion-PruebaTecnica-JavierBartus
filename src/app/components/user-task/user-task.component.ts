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


    constructor(public api: ApiService, public router: Router) { }

    users: any = [];
    tasks: any = [];
    filteredTasks: any = [];
    userComplete: any
    completedTasks: number = 0;
    pendingTasks: number = 0;
    filterSelected: string = 'all';


    ngOnInit(): void {

      if (typeof window !== 'undefined' && localStorage) {
        const user = localStorage.getItem('user');
        this.userComplete = user ? JSON.parse(user) : null;
      } else {
        console.warn('localStorage no está disponible en este entorno.');
        this.userComplete = null;
      }
      const userId = this.router.url.split('/').pop();
      if (userId) {
        this.api.getUserTasks(userId).subscribe((tasks: any) => {
          this.tasks = tasks;
          this.updateTaskCounts();
          this.filterTasks('all');
        });
      }

    }


    updateTaskCounts(): void {
      this.completedTasks = this.tasks.filter((task: any) => task.completed).length;
      this.pendingTasks = this.tasks.filter((task: any) => !task.completed).length;
    }


    toggleTaskStatus(task: any): void {
      task.completed = !task.completed;
      this.updateTaskCounts();
      this.filterTasks(this.filterSelected);

    }
    filterTasks(filter: string): void {
      this.filterSelected = filter;
      if (filter === 'all') {
        this.filteredTasks = [...this.tasks];
      } else if (filter === 'completed') {
        this.filteredTasks = this.tasks.filter((task: any) => task.completed);
      } else if (filter === 'pending') {
        this.filteredTasks = this.tasks.filter((task: any) => !task.completed);
      }
    }

    sortTasks(event: Event): void {
      const criteria = (event.target as HTMLSelectElement).value;
      if (criteria === 'alphabetical') {
        this.filteredTasks.sort((a: any, b: any) => a.title.localeCompare(b.title));
      } else if (criteria === 'completed') {
        this.filteredTasks.sort((a: any, b: any) => (b.completed ? 1 : -1) - (a.completed ? 1 : -1));
      } else if (criteria === 'pending') {
        this.filteredTasks.sort((a: any, b: any) => (a.completed ? 1 : -1) - (b.completed ? 1 : -1));
      }
    }


}
