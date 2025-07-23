import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import { useState } from 'react';
import Icons from './Icons';
import PropTypes from 'prop-types';

const SampleForm = ({ onSubmitSuccess }) => {
  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  
  // Initialize React Hook Form
  const methods = useForm({
    mode: 'onBlur', // Validate on blur
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      age: '',
      phone: '',
      website: '',
      bio: '',
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    setFormData(data);
    setIsSubmitted(true);
    
    // If onSubmitSuccess prop is provided, call it with the form data
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    } else {
      // Default behavior if no callback provided
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Reset form
  const handleReset = () => {
    methods.reset();
    setIsSubmitted(false);
    setFormData(null);
  };

  // Using our Icons component for all icons

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-8 text-center relative pb-3">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Sample Form</span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
      </h2>
      
      {isSubmitted && (
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-lg shadow-sm">
          <div className="flex items-center mb-3">
            <span className="text-green-500 mr-2"><Icons.Check /></span>
            <h3 className="font-bold text-lg">Form Submitted Successfully!</h3>
          </div>
          <p className="text-sm mb-4 text-green-600">Here's what you submitted:</p>
          <pre className="bg-white p-4 rounded-md text-xs overflow-auto max-h-40 border border-green-100 shadow-inner">
            {JSON.stringify(formData, null, 2)}
          </pre>
          <button 
            onClick={handleReset} 
            className="mt-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center"
          >
            <span className="mr-2"><Icons.Reset /></span>
            Reset Form
          </button>
        </div>
      )}
      
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Text input with required validation and User icon */}
            <FormInput
              name="fullName"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              validation={{
                required: true,
                minLength: 3,
                maxLength: 50,
              }}
              icon={<Icons.User />}
              helperText="Enter your legal full name"
            />
            
            {/* Email input with pattern validation and icon */}
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              validation={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                patternMessage: 'Please enter a valid email address',
              }}
              icon={<Icons.Email />}
              helperText="We'll never share your email"
            />
          </div>
          
          {/* Password input with custom validation and Lock icon */}
          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            validation={{
              required: true,
              minLength: 8,
              validate: (value) => {
                if (!/[A-Z]/.test(value)) {
                  return 'Password must contain at least one uppercase letter';
                }
                if (!/[0-9]/.test(value)) {
                  return 'Password must contain at least one number';
                }
                if (!/[^A-Za-z0-9]/.test(value)) {
                  return 'Password must contain at least one special character';
                }
                return true;
              },
            }}
            icon={<Icons.Lock />}
            helperText="Must contain at least 8 characters, including uppercase, number, and special character"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Number input with Calendar icon */}
            <FormInput
              name="age"
              label="Age"
              type="number"
              placeholder="Enter your age"
              validation={{
                required: true,
                validate: (value) => {
                  const numValue = parseInt(value);
                  if (isNaN(numValue) || numValue < 18) {
                    return 'You must be at least 18 years old';
                  }
                  if (numValue > 120) {
                    return 'Please enter a valid age';
                  }
                  return true;
                },
              }}
              icon={<Icons.Calendar />}
              helperText="Must be at least 18 years old"
            />
            
            {/* Phone input with pattern and icon */}
            <FormInput
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="(123) 456-7890"
              validation={{
                pattern: /^\(\d{3}\)\s\d{3}-\d{4}$/,
                patternMessage: 'Phone format: (123) 456-7890',
              }}
              icon={<Icons.Phone />}
              helperText="Format: (123) 456-7890"
            />
          </div>
          
          {/* Website URL input with Globe icon */}
          <FormInput
            name="website"
            label="Website"
            type="url"
            placeholder="https://example.com"
            validation={{
              pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
              patternMessage: 'Please enter a valid URL (e.g., https://example.com)',
            }}
            icon={<Icons.Globe />}
            helperText="Optional: Enter your website URL"
          />
          
          {/* Textarea input for bio with Document icon */}
          <div className="form-control mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <span className="mr-2"><Icons.Document /></span>
              Bio
            </label>
            <textarea
              id="bio"
              {...methods.register('bio')}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:border-blue-300 shadow-input"
              placeholder="Tell us about yourself..."
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">Optional: Share a brief description about yourself</p>
          </div>
          
          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              onClick={() => methods.reset()}
              className="flex-1 flex justify-center items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 shadow-sm hover:shadow"
            >
              <span className="mr-2"><Icons.Reset /></span>
              Reset
            </button>
            <button
              type="submit"
              className="flex-1 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 shadow-sm hover:shadow"
            >
              <span className="mr-2"><Icons.Submit /></span>
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

// PropTypes
SampleForm.propTypes = {
  onSubmitSuccess: PropTypes.func
};

// Default props
SampleForm.defaultProps = {
  onSubmitSuccess: null
};

export default SampleForm;