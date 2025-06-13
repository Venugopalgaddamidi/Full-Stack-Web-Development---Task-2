import { InternshipApplication, OfferLetter, ApiResponse } from '../types';

const API_BASE_URL = 'https://api.internship-system.com'; // Replace with your actual API URL

// Mock API responses for demonstration
const mockApiCall = <T>(data: T, delay: number = 1500): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate random success/failure for demonstration
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        resolve({
          success: true,
          data,
          message: 'Operation completed successfully!'
        });
      } else {
        resolve({
          success: false,
          message: 'Operation failed. Please try again.',
          error: 'Network error or server unavailable'
        });
      }
    }, delay);
  });
};

export const apiService = {
  // Internship Application API
  submitInternshipApplication: async (application: InternshipApplication): Promise<ApiResponse<InternshipApplication>> => {
    try {
      // In a real application, you would make an actual fetch call:
      // const response = await fetch(`${API_BASE_URL}/internship-applications`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(application),
      // });
      // const data = await response.json();
      // return data;

      // For demonstration, using mock API
      const applicationWithId = { ...application, id: Date.now().toString() };
      return await mockApiCall(applicationWithId);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit application',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Offer Letter Generation API
  generateOfferLetter: async (offerLetter: OfferLetter): Promise<ApiResponse<OfferLetter>> => {
    try {
      // In a real application:
      // const response = await fetch(`${API_BASE_URL}/offer-letters`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(offerLetter),
      // });
      // const data = await response.json();
      // return data;

      // For demonstration, using mock API
      const offerLetterWithId = { ...offerLetter, id: Date.now().toString() };
      return await mockApiCall(offerLetterWithId);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate offer letter',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Get all applications (for admin/HR view)
  getApplications: async (): Promise<ApiResponse<InternshipApplication[]>> => {
    try {
      // Mock data for demonstration
      const mockApplications: InternshipApplication[] = [];
      return await mockApiCall(mockApplications, 1000);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch applications',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};