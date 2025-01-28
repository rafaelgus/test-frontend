import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from 'src/app/interfaces/booking';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
  standalone: false,
})
export class ClassesPage implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBooking().subscribe({
      next: (data) => {
        this.bookings = data;
        this.filteredBookings = data;
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'No se pudieron cargar las reservas.';
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }

  filterBookings() {
    this.filteredBookings = this.bookings.filter(booking =>
      booking.student.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      booking.student.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
