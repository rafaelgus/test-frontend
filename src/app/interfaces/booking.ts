export interface Tutor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  nationality: string;
  speciality: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Booking {
  id: string;
  tutor_id: string;
  student_id: string;
  date: string;
  start_time: string;
  end_time: string;
  created_at: string | null;
  updated_at: string | null;
  tutor: Tutor;
  student: User;
}