export interface IProfile {
  id?: number;
  name: string;
  bio: string;
  location: string;
  nationality: string;
  availability: 'available' | 'interviewing' | 'not-available';
  dateOfBirth: Date;
  email: string;
  phone: string;
  address: string;
  github: string;
  twitter: string;
  linkedin: string;
  expectedSalary: number;
  ownACar: boolean;
  haveDrivingLicense: boolean;
  noticePeriod: number;
  immigrationStatus: string;
  referees: any;
  willingToRelocate: boolean;
  languages: any;
  skills: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}