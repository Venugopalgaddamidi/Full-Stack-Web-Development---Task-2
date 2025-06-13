import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { InternshipApplication } from '../types';
import { apiService } from '../services/api';
import { FormField, Input, Textarea, Select } from './FormField';
import { LoadingSpinner } from './LoadingSpinner';
import { Toast } from './Toast';

interface InternshipApplicationFormProps {
  onBack: () => void;
}

export const InternshipApplicationForm: React.FC<InternshipApplicationFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<InternshipApplication>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: ''
    },
    academicInfo: {
      university: '',
      degree: '',
      major: '',
      graduationDate: '',
      gpa: ''
    },
    internshipInfo: {
      position: '',
      department: '',
      startDate: '',
      duration: '',
      workMode: 'On-site'
    },
    additionalInfo: {
      coverLetter: '',
      skills: [],
      previousExperience: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' as 'success' | 'error' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillInput, setSkillInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Personal Info validation
    if (!formData.personalInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.personalInfo.email.trim()) newErrors.email = 'Email is required';
    if (!formData.personalInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    // Academic Info validation
    if (!formData.academicInfo.university.trim()) newErrors.university = 'University is required';
    if (!formData.academicInfo.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.academicInfo.major.trim()) newErrors.major = 'Major is required';
    if (!formData.academicInfo.graduationDate) newErrors.graduationDate = 'Graduation date is required';

    // Internship Info validation
    if (!formData.internshipInfo.position.trim()) newErrors.position = 'Position is required';
    if (!formData.internshipInfo.department.trim()) newErrors.department = 'Department is required';
    if (!formData.internshipInfo.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.internshipInfo.duration.trim()) newErrors.duration = 'Duration is required';

    // Additional Info validation
    if (!formData.additionalInfo.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section: keyof InternshipApplication, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.additionalInfo.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          skills: [...prev.additionalInfo.skills, skillInput.trim()]
        }
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        skills: prev.additionalInfo.skills.filter(skill => skill !== skillToRemove)
      }
    }));
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
      const response = await apiService.submitInternshipApplication(formData);
      
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
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Product Management', label: 'Product Management' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Design', label: 'Design' },
    { value: 'Business Development', label: 'Business Development' }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Internship Application</h1>
            <p className="text-gray-600">Please fill out all sections to complete your application.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="First Name" required error={errors.firstName}>
                  <Input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    error={!!errors.firstName}
                    placeholder="Enter your first name"
                  />
                </FormField>
                <FormField label="Last Name" required error={errors.lastName}>
                  <Input
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    error={!!errors.lastName}
                    placeholder="Enter your last name"
                  />
                </FormField>
                <FormField label="Email" required error={errors.email}>
                  <Input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    error={!!errors.email}
                    placeholder="your.email@example.com"
                  />
                </FormField>
                <FormField label="Phone" required error={errors.phone}>
                  <Input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    error={!!errors.phone}
                    placeholder="+1 (555) 123-4567"
                  />
                </FormField>
                <FormField label="Date of Birth" required error={errors.dateOfBirth}>
                  <Input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    error={!!errors.dateOfBirth}
                  />
                </FormField>
              </div>
              <FormField label="Address" required error={errors.address}>
                <Input
                  type="text"
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  error={!!errors.address}
                  placeholder="123 Main St, City, State, ZIP"
                />
              </FormField>
            </div>

            {/* Academic Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="University" required error={errors.university}>
                  <Input
                    type="text"
                    value={formData.academicInfo.university}
                    onChange={(e) => handleInputChange('academicInfo', 'university', e.target.value)}
                    error={!!errors.university}
                    placeholder="University Name"
                  />
                </FormField>
                <FormField label="Degree" required error={errors.degree}>
                  <Input
                    type="text"
                    value={formData.academicInfo.degree}
                    onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
                    error={!!errors.degree}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </FormField>
                <FormField label="Major" required error={errors.major}>
                  <Input
                    type="text"
                    value={formData.academicInfo.major}
                    onChange={(e) => handleInputChange('academicInfo', 'major', e.target.value)}
                    error={!!errors.major}
                    placeholder="Computer Science, Business, etc."
                  />
                </FormField>
                <FormField label="Expected Graduation Date" required error={errors.graduationDate}>
                  <Input
                    type="date"
                    value={formData.academicInfo.graduationDate}
                    onChange={(e) => handleInputChange('academicInfo', 'graduationDate', e.target.value)}
                    error={!!errors.graduationDate}
                  />
                </FormField>
                <FormField label="GPA (Optional)">
                  <Input
                    type="text"
                    value={formData.academicInfo.gpa}
                    onChange={(e) => handleInputChange('academicInfo', 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </FormField>
              </div>
            </div>

            {/* Internship Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Internship Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Desired Position" required error={errors.position}>
                  <Select
                    value={formData.internshipInfo.position}
                    onChange={(e) => handleInputChange('internshipInfo', 'position', e.target.value)}
                    error={!!errors.position}
                    options={positionOptions}
                  />
                </FormField>
                <FormField label="Department" required error={errors.department}>
                  <Select
                    value={formData.internshipInfo.department}
                    onChange={(e) => handleInputChange('internshipInfo', 'department', e.target.value)}
                    error={!!errors.department}
                    options={departmentOptions}
                  />
                </FormField>
                <FormField label="Preferred Start Date" required error={errors.startDate}>
                  <Input
                    type="date"
                    value={formData.internshipInfo.startDate}
                    onChange={(e) => handleInputChange('internshipInfo', 'startDate', e.target.value)}
                    error={!!errors.startDate}
                  />
                </FormField>
                <FormField label="Duration" required error={errors.duration}>
                  <Input
                    type="text"
                    value={formData.internshipInfo.duration}
                    onChange={(e) => handleInputChange('internshipInfo', 'duration', e.target.value)}
                    error={!!errors.duration}
                    placeholder="3 months, 6 months, etc."
                  />
                </FormField>
                <FormField label="Work Mode" required>
                  <Select
                    value={formData.internshipInfo.workMode}
                    onChange={(e) => handleInputChange('internshipInfo', 'workMode', e.target.value as any)}
                    options={workModeOptions}
                  />
                </FormField>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
              
              <FormField label="Cover Letter" required error={errors.coverLetter}>
                <Textarea
                  value={formData.additionalInfo.coverLetter}
                  onChange={(e) => handleInputChange('additionalInfo', 'coverLetter', e.target.value)}
                  error={!!errors.coverLetter}
                  placeholder="Tell us why you're interested in this internship and what you can bring to our team..."
                  rows={6}
                />
              </FormField>

              <FormField label="Skills">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill (e.g., JavaScript, Python, Communication)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.additionalInfo.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.additionalInfo.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-purple-600 hover:text-purple-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </FormField>

              <FormField label="Previous Experience (Optional)">
                <Textarea
                  value={formData.additionalInfo.previousExperience}
                  onChange={(e) => handleInputChange('additionalInfo', 'previousExperience', e.target.value)}
                  placeholder="Describe any relevant work experience, projects, or activities..."
                  rows={4}
                />
              </FormField>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" color="text-white" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
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