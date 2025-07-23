# React Form Input Component

A reusable React form input component that integrates with React Hook Form for easy form handling and validation, with enhanced UI features, SVG icons, and modern styling.

## Features

- Handles all common input types: text, email, number, password, url, tel, etc.
- Integrates with `useFormContext()` from React Hook Form
- Shows error messages dynamically based on validation results
- Supports various validation rules:
  - Required fields
  - Min length / Max length
  - Pattern validation (regex)
  - Custom validation functions
- Enhanced UI features:
  - Password visibility toggle with eye icons
  - Password strength indicator
  - SVG icon support (left or right positioning)
  - Helper text for additional guidance
  - Responsive grid layout
  - Form submission feedback with success message
  - Beautiful button animations and transitions
- Uses Tailwind CSS for styling with custom utility classes
- Includes a comprehensive SVG icon library

## Installation

```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | string | Field name (required) |
| `label` | string | Input label text |
| `type` | string | Input type (text, email, password, number, tel, url, etc.) |
| `placeholder` | string | Placeholder text |
| `validation` | object | Validation rules object |
| `validation.required` | boolean | Whether the field is required |
| `validation.minLength` | number | Minimum character length |
| `validation.maxLength` | number | Maximum character length |
| `validation.pattern` | RegExp | Regular expression pattern |
| `validation.patternMessage` | string | Custom message for pattern validation |
| `validation.validate` | function | Custom validation function |
| `helperText` | string | Helper text displayed below the input |
| `disabled` | boolean | Whether the input is disabled |
| `readOnly` | boolean | Whether the input is read-only |
| `icon` | ReactNode | Icon element to display with the input |
| `iconPosition` | string | Position of the icon ('left' or 'right', default: 'left') |

## Password Strength Indicator

The component automatically displays a password strength indicator when the input type is 'password'. The strength is calculated based on:

- Password length (minimum 8 characters)
- Presence of uppercase letters
- Presence of numbers
- Presence of special characters

The indicator shows three levels:
- Weak (red): Meets 1 criterion
- Medium (orange): Meets 2-3 criteria
- Strong (green): Meets all 4 criteriabash
npm install
npm run dev
```

## Usage

### Basic Example

```jsx
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './components/FormInput';

const MyForm = () => {
  const methods = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput 
          name="username" 
          label="Username" 
          type="text" 
          placeholder="Enter your username"
          validation={{
            required: true,
            minLength: 3
          }}
          helperText="Username must be at least 3 characters"
        />
        
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
```

### Advanced Examples

```jsx
// Required field with helper text
<FormInput
  name="fullName"
  label="Full Name"
  validation={{ required: true }}
  helperText="Enter your legal full name"
/>

// Email validation with pattern and icon
<FormInput
  name="email"
  label="Email"
  type="email"
  validation={{
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    patternMessage: 'Please enter a valid email address'
  }}
  icon={<EmailIcon />}
  iconPosition="left"
  helperText="We'll never share your email"
/>

// Password with custom validation and strength indicator
<FormInput
  name="password"
  label="Password"
  type="password"
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
    }
  }}
  helperText="Must contain uppercase, number, and special character"
/>

// Disabled input
<FormInput
  name="username"
  label="Username"
  type="text"
  disabled={true}
  value="johndoe"
/>

// Read-only input
<FormInput
  name="id"
  label="User ID"
  type="text"
  readOnly={true}
  value="USR12345"
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | string | Field name (required) |
| `label` | string | Field label |
| `type` | string | Input type (text, email, password, etc.) |
| `placeholder` | string | Input placeholder text |
| `validation` | object | Validation rules |
| `validation.required` | boolean | Whether the field is required |
| `validation.minLength` | number | Minimum length requirement |
| `validation.maxLength` | number | Maximum length requirement |
| `validation.pattern` | RegExp | Regex pattern for validation |
| `validation.patternMessage` | string | Custom message for pattern validation |
| `validation.validate` | function | Custom validation function |
| `className` | string | Additional CSS classes |

## Icons Component

The project includes a comprehensive SVG icon library that can be used throughout the application.

```jsx
import Icons from './components/Icons';

// Usage examples
<Icons.Email />
<Icons.Phone />
<Icons.User />
<Icons.Lock />
<Icons.Eye />
<Icons.EyeOff />
<Icons.Globe />
<Icons.Calendar />
<Icons.Document />
<Icons.Check />
<Icons.Warning />
<Icons.Reset />
<Icons.Submit />
<Icons.Code />
```

### Available Icons

| Icon Name | Description |
|-----------|-------------|
| `Email` | Email/envelope icon |
| `Phone` | Phone/telephone icon |
| `User` | User/person profile icon |
| `Lock` | Lock/password security icon |
| `Eye` | Eye icon for password visibility |
| `EyeOff` | Crossed eye icon for hiding password |
| `Globe` | Globe/website icon |
| `Calendar` | Calendar/date icon |
| `Document` | Document/text file icon |
| `Check` | Checkmark/success icon |
| `Warning` | Warning/alert triangle icon |
| `Reset` | Reset/refresh circular arrow icon |
| `Submit` | Submit/forward arrow icon |
| `Code` | Code/development icon |

## License

MIT
