import React from 'react';
import { Users, FileText, Building2, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'application' | 'offer-letter') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Total Applications', value: '247', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Offer Letters Sent', value: '89', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Positions', value: '12', icon: Building2, color: 'from-green-500 to-green-600' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Internship Management</h1>
              <p className="text-gray-600 mt-1">Streamline your internship application and offer letter process</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Internship Application Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Apply for Internship</h2>
                  <p className="text-purple-100">Submit your application for available internship positions</p>
                </div>
                <Users className="w-12 h-12 text-purple-200" />
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>Personal & Academic Information</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>Position Preferences & Skills</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>Cover Letter & Experience</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('application')}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Start Application</span>
              </button>
            </div>
          </div>

          {/* Offer Letter Generation Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Generate Offer Letter</h2>
                  <p className="text-blue-100">Create professional offer letters for selected candidates</p>
                </div>
                <FileText className="w-12 h-12 text-blue-200" />
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Candidate Information</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Position Details & Compensation</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Company Information & Terms</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('offer-letter')}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>Create Offer Letter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Complete Profile</h4>
                <p className="text-gray-600 text-sm">Fill out all sections for better application visibility</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Professional Letters</h4>
                <p className="text-gray-600 text-sm">Generate consistent, professional offer letters</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Track Progress</h4>
                <p className="text-gray-600 text-sm">Monitor application status and success rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};