import { Component, OnInit } from '@angular/core';
import { Tutor } from 'src/app/interfaces/tutors';
import { TutorsService } from 'src/app/services/tutors.service';


@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.page.html',
  styleUrls: ['./tutors.page.scss'],
  standalone: false,
})
export class TutorsPage implements OnInit {
  tutors: Tutor[] = [];
  filteredTutors: Tutor[] = [];
 
  searchTerm: string = '';
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  constructor(private tutorService: TutorsService) {}


  ngOnInit() {
    this.loadTutors();
  }

  loadTutors() {
    this.tutorService.getTutors(this.currentPage, this.itemsPerPage).subscribe({
      
      next: (data) => {
        console.log(data);
        this.tutors = data;
        this.filteredTutors = data;
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'No se pudieron cargar los tutores.';
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  filterTutors() {
    this.filteredTutors = this.tutors.filter(tutor =>
      tutor.speciality.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage() {
    this.currentPage++;
    this.loadTutors();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTutors();
    }
  }
}
