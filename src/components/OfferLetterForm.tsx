import React, { useState } from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { OfferLetter } from '../types';
import { apiService } from '../services/api';
import { FormField, Input, Textarea, Select } from './FormField';
import { LoadingSpinner } from './LoadingSpinner';
import { Toast } from './Toast';

interface OfferLetterFormProps {
  onBack: () => void;
}

export const OfferLetterForm: React.FC<OfferLetterFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<OfferLetter>({
    candidateInfo: {
      name: '',
      email: '',
      address: ''
    },
    positionDetails: {
      title: '',
      department: '',
      startDate: '',
      duration: '',
      stipend: '',
      workMode: 'On-site'
    },
    companyInfo: {
      name: '',
      address: '',
      contactPerson: '',
      contactEmail: ''
    },
    additionalTerms: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' as 'success' | 'error' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Candidate Info validation
    if (!formData.candidateInfo.name.trim()) newErrors.candidateName = 'Candidate name is required';
    if (!formData.candidateInfo.email.trim()) newErrors.candidateEmail = 'Candidate email is required';
    if (!formData.candidateInfo.address.trim()) newErrors.candidateAddress = 'Candidate address is required';

    // Position Details validation
    if (!formData.positionDetails.title.trim()) newErrors.positionTitle = 'Position title is required';
    if (!formData.positionDetails.department.trim()) newErrors.positionDepartment = 'Department is required';
    if (!formData.positionDetails.startDate) newErrors.positionStartDate = 'Start date is required';
    if (!formData.positionDetails.duration.trim()) newErrors.positionDuration = 'Duration is required';
    if (!formData.positionDetails.stipend.trim()) newErrors.positionStipend = 'Stipend is required';

    // Company Info validation
    if (!formData.companyInfo.name.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.companyInfo.address.trim()) newErrors.companyAddress = 'Company address is required';
    if (!formData.companyInfo.contactPerson.trim()) newErrors.companyContact = 'Contact person is required';
    if (!formData.companyInfo.contactEmail.trim()) newErrors.companyEmail = 'Contact email is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section: keyof OfferLetter, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    const errorKey = `${section}${field.charAt(0).toUpperCase()}${field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({
        isVisible: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiService.generateOfferLetter(formData);
      
      if (response.success) {
        setToast({
          isVisible: true,
          message: response.message,
          type: 'success'
        });
        // Reset form after successful submission
        setTimeout(() => {
          onBack();
        }, 2000);
      } else {
        setToast({
          isVisible: true,
          message: response.message,
          type: 'error'
        });
      }
    } catch (error) {
      setToast({
        isVisible: true,
        message: 'An unexpected error occurred. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const positionOptions = [
    { value: 'Software Engineering Intern', label: 'Software Engineering Intern' },
    { value: 'Data Science Intern', label: 'Data Science Intern' },
    { value: 'Product Management Intern', label: 'Product Management Intern' },
    { value: 'Marketing Intern', label: 'Marketing Intern' },
    { value: 'Design Intern', label: 'Design Intern' },
    { value: 'Business Development Intern', label: 'Business Development Intern' }
  ];

  const departmentOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Product', label: 'Product' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' }
  ];

  const workModeOptions = [
    { value: 'On-site', label: 'On-site' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Offer Letter</h1>
            <p className="text-gray-600">Create a professional offer letter for the selected candidate.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Candidate Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Candidate Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Full Name" required error={errors.candidateName}>
                  <Input
                    type="text"
                    value={formData.candidateInfo.name}
                    onChange={(e) => handleInputChange('candidateInfo', 'name', e.target.value)}
                    error={!!errors.candidateName}
                    placeholder="John Doe"
                  />
                </FormField>
                <FormField label="Email Address" required error={errors.candidateEmail}>
                  <Input
                    type="email"
                    value={formData.candidateInfo.email}
                    onChange={(e) => handleInputChange('candidateInfo', 'email', e.target.value)}
                    error={!!errors.candidateEmail}
                    placeholder="john.doe@example.com"
                  />
                </FormField>
              </div>
              <FormField label="Address" required error={errors.candidateAddress}>
                <Input
                  type="text"
                  value={formData.candidateInfo.address}
                  onChange={(e) => handleInputChange('candidateInfo', 'address', e.target.value)}
                  error={!!errors.candidateAddress}
                  placeholder="123 Main St, City, State, ZIP"
                />
              </FormField>
            </div>

            {/* Position Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Position Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Position Title" required error={errors.positionTitle}>
                  <Select
                    value={formData.positionDetails.title}
                    onChange={(e) => handleInputChange('positionDetails', 'title', e.target.value)}
                    error={!!errors.positionTitle}
                    options={positionOptions}
                  />
                </FormField>
                <FormField label="Department" required error={errors.positionDepartment}>
                  <Select
                    value={formData.positionDetails.department}
                    onChange={(e) => handleInputChange('positionDetails', 'department', e.target.value)}
                    error={!!errors.positionDepartment}
                    options={departmentOptions}
                  />
                </FormField>
                <FormField label="Start Date" required error={errors.positionStartDate}>
                  <Input
                    type="date"
                    value={formData.positionDetails.startDate}
                    onChange={(e) => handleInputChange('positionDetails', 'startDate', e.target.value)}
                    error={!!errors.positionStartDate}
                  />
                </FormField>
                <FormField label="Duration" required error={errors.positionDuration}>
                  <Input
                    type="text"
                    value={formData.positionDetails.duration}
                    onChange={(e) => handleInputChange('positionDetails', 'duration', e.target.value)}
                    error={!!errors.positionDuration}
                    placeholder="3 months, 6 months, etc."
                  />
                </FormField>
                <FormField label="Monthly Stipend" required error={errors.positionStipend}>
                  <Input
                    type="text"
                    value={formData.positionDetails.stipend}
                    onChange={(e) => handleInputChange('positionDetails', 'stipend', e.target.value)}
                    error={!!errors.positionStipend}
                    placeholder="$2,000, $3,500, etc."
                  />
                </FormField>
                <FormField label="Work Mode" required>
                  <Select
                    value={formData.positionDetails.workMode}
                    onChange={(e) => handleInputChange('positionDetails', 'workMode', e.target.value as any)}
                    options={workModeOptions}
                  />
                </FormField>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Company Name" required error={errors.companyName}>
                  <Input
                    type="text"
                    value={formData.companyInfo.name}
                    onChange={(e) => handleInputChange('companyInfo', 'name', e.target.value)}
                    error={!!errors.companyName}
                    placeholder="TechCorp Inc."
                  />
                </FormField>
                <FormField label="Company Address" required error={errors.companyAddress}>
                  <Input
                    type="text"
                    value={formData.companyInfo.address}
                    onChange={(e) => handleInputChange('companyInfo', 'address', e.target.value)}
                    error={!!errors.companyAddress}
                    placeholder="456 Business Ave, City, State, ZIP"
                  />
                </FormField>
                <FormField label="Contact Person" required error={errors.companyContact}>
                  <Input
                    type="text"
                    value={formData.companyInfo.contactPerson}
                    onChange={(e) => handleInputChange('companyInfo', 'contactPerson', e.target.value)}
                    error={!!errors.companyContact}
                    placeholder="Jane Smith, HR Manager"
                  />
                </FormField>
                <FormField label="Contact Email" required error={errors.companyEmail}>
                  <Input
                    type="email"
                    value={formData.companyInfo.contactEmail}
                    onChange={(e) => handleInputChange('companyInfo', 'contactEmail', e.target.value)}
                    error={!!errors.companyEmail}
                    placeholder="hr@techcorp.com"
                  />
                </FormField>
              </div>
            </div>

            {/* Additional Terms */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Terms & Conditions</h2>
              <FormField label="Additional Terms (Optional)">
                <Textarea
                  value={formData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', 'additionalTerms', e.target.value)}
                  placeholder="Add any specific terms, conditions, or requirements for this internship position..."
                  rows={6}
                />
              </FormField>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" color="text-white" />
                    Generating Offer Letter...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Generate Offer Letter
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};