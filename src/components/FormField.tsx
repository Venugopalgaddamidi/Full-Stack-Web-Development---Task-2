import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required = false, 
  children 
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
          {error}
        </p>
      )}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`
        w-full px-4 py-3 border rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
        ${error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-gray-400 focus:border-purple-500'
        }
        ${className}
      `}
    />
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ error, className = '', ...props }) => {
  return (
    <textarea
      {...props}
      className={`
        w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-vertical
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
        ${error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-gray-400 focus:border-purple-500'
        }
        ${className}
      `}
    />
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ error, options, className = '', ...props }) => {
  return (
    <select
      {...props}
      className={`
        w-full px-4 py-3 border rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
        ${error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-300 hover:border-gray-400 focus:border-purple-500'
        }
        ${className}
      `}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};