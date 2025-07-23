import React from 'react';
import Icons from './Icons';

/**
 * FormSubmissionPage component that displays submitted form data in a new page
 * @param {Object} props - Component props
 * @param {Object} props.formData - The submitted form data
 * @param {Function} props.onBack - Function to go back to the form
 */
const FormSubmissionPage = ({ formData, onBack }) => {
  if (!formData) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100 text-center">
        <div className="text-red-500 mb-4"><Icons.Warning /></div>
        <h2 className="text-xl font-bold mb-4">No Form Data Available</h2>
        <p className="text-gray-600 mb-6">There is no submitted form data to display.</p>
        <button 
          onClick={onBack}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center mx-auto"
        >
          <span className="mr-2">←</span> Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500">Form Submission Details</span>
        </h2>
        <button 
          onClick={onBack}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 flex items-center"
        >
          <span className="mr-2">←</span> Back to Form
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 mb-6">
        <div className="flex items-center mb-4">
          <span className="text-green-500 mr-2"><Icons.Check /></span>
          <h3 className="font-bold text-lg text-blue-800">Submission Successful!</h3>
        </div>
        <p className="text-blue-700 mb-2">Thank you for submitting the form. Here's a summary of your information:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-blue-500 mr-2"><Icons.User /></span>
            Personal Information
          </h3>
          <div className="space-y-3">
            {formData.fullName && (
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{formData.fullName}</p>
              </div>
            )}
            {formData.age && (
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{formData.age}</p>
              </div>
            )}
            {formData.bio && (
              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="font-medium">{formData.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-blue-500 mr-2"><Icons.Phone /></span>
            Contact Information
          </h3>
          <div className="space-y-3">
            {formData.email && (
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
            )}
            {formData.phone && (
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{formData.phone}</p>
              </div>
            )}
            {formData.website && (
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium">{formData.website}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Raw Data Card */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="text-blue-500 mr-2"><Icons.Document /></span>
          Complete Form Data
        </h3>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-60 border border-gray-200 shadow-inner">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormSubmissionPage;