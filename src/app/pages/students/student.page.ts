import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/booking';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
  standalone: false,
})
export class StudentPage implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  errorMessage: string = '';

  // Variables para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getStudents(this.currentPage, this.itemsPerPage).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'No se pudieron cargar los usuarios.';
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  selectUser(user: User) {
    this.router.navigate(['/student-detail', user.id]);
  }

  nextPage() {
    this.currentPage++;
    this.loadUsers();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

}
