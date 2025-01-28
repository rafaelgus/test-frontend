import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/student';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
  standalone: false,

})
export class StudentDetailPage implements OnInit {
  user: User | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'No se pudieron cargar los detalles del usuario.';
        },
        complete: () => {
          console.log('Completed');
        },
      });
    }
  }
}
