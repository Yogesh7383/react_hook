import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import Icons from './Icons';

/**
 * FormInput component that handles various input types with validation
 * @param {Object} props - Component props
 * @param {string} props.name - Input field name
 * @param {string} props.label - Input field label
 * @param {string} props.type - Input type (text, email, password, number, etc.)
 * @param {string} props.placeholder - Input placeholder text
 * @param {Object} props.validation - Validation rules object
 * @param {boolean} props.validation.required - Whether the field is required
 * @param {number} props.validation.minLength - Minimum length requirement
 * @param {number} props.validation.maxLength - Maximum length requirement
 * @param {RegExp} props.validation.pattern - Regex pattern for validation
 * @param {Function} props.validation.validate - Custom validation function
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.helperText - Helper text to display below the input
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {boolean} props.readOnly - Whether the input is read-only
 * @param {React.ReactNode} props.icon - Icon to display inside the input
 * @param {string} props.iconPosition - Position of the icon ('left' or 'right')
 */
const FormInput = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  validation = {},
  className = '',
  helperText = '',
  disabled = false,
  readOnly = false,
  icon = null,
  iconPosition = 'left',
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  
  // Get methods from React Hook Form context
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  // Get error message for this field if it exists
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;
  const isTouched = touchedFields[name];
  
  // Determine the actual input type (for password toggle)
  const actualType = type === 'password' && showPassword ? 'text' : type;

  // Base input classes
  const inputClasses = `
    form-input 
    w-full 
    px-4 
    py-2 
    border 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    transition-all 
    duration-300 
    ease-in-out 
    hover:border-blue-300 
    shadow-input 
    ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'} 
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''} 
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Render password toggle button for password fields
  const renderPasswordToggle = () => {
    if (type !== 'password') return null;
    
    return (
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
        onClick={togglePasswordVisibility}
        tabIndex="-1"
      >
        {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
      </button>
    );
  };

  // Render icon if provided
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none text-gray-500`}>
        {icon}
      </div>
    );
  };

  return (
    <div className="form-control mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {validation.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {renderIcon()}
        
        <input
          id={name}
          type={actualType}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          readOnly={readOnly}
          {...register(name, {
            required: validation.required && {
              value: true,
              message: `${label || name} is required`,
            },
            minLength: validation.minLength && {
              value: validation.minLength,
              message: `${label || name} must be at least ${validation.minLength} characters`,
            },
            maxLength: validation.maxLength && {
              value: validation.maxLength,
              message: `${label || name} must not exceed ${validation.maxLength} characters`,
            },
            pattern: validation.pattern && {
              value: validation.pattern,
              message: validation.patternMessage || `${label || name} format is invalid`,
            },
            validate: validation.validate,
          })}
        />
        
        {renderPasswordToggle()}
      </div>

      {hasError && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {errorMessage}
        </p>
      )}
      
      {!hasError && helperText && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      
      {type === 'password' && validation.minLength && !hasError && (
        <div className="mt-1 flex space-x-1">
          <div className={`h-1 flex-1 rounded-full ${touchedFields[name] ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          <div className={`h-1 flex-1 rounded-full ${touchedFields[name] && validation.minLength ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          <div className={`h-1 flex-1 rounded-full ${touchedFields[name] && validation.validate ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        </div>
      )}
    </div>
  );
};

export default FormInput;