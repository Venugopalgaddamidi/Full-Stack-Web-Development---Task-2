export interface InternshipApplication {
  id?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
  };
  academicInfo: {
    university: string;
    degree: string;
    major: string;
    graduationDate: string;
    gpa: string;
  };
  internshipInfo: {
    position: string;
    department: string;
    startDate: string;
    duration: string;
    workMode: 'Remote' | 'On-site' | 'Hybrid';
  };
  additionalInfo: {
    coverLetter: string;
    skills: string[];
    previousExperience: string;
  };
}

export interface OfferLetter {
  id?: string;
  candidateInfo: {
    name: string;
    email: string;
    address: string;
  };
  positionDetails: {
    title: string;
    department: string;
    startDate: string;
    duration: string;
    stipend: string;
    workMode: 'Remote' | 'On-site' | 'Hybrid';
  };
  companyInfo: {
    name: string;
    address: string;
    contactPerson: string;
    contactEmail: string;
  };
  additionalTerms: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}