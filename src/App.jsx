import './App.css'
import { useState } from 'react'
import SampleForm from './components/SampleForm'
import FormSubmissionPage from './components/FormSubmissionPage'
import Icons from './components/Icons'

function App() {
  // State to track form submission and data
  const [submittedData, setSubmittedData] = useState(null);
  const [showSubmissionPage, setShowSubmissionPage] = useState(false);
  
  // Handle form submission
  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    setShowSubmissionPage(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle going back to the form
  const handleBackToForm = () => {
    setShowSubmissionPage(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">React Form Input</span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">A professional, reusable form component with advanced validation and modern styling</p>
        </header>
        
        <main>
          {showSubmissionPage ? (
            <FormSubmissionPage formData={submittedData} onBack={handleBackToForm} />
          ) : (
            <SampleForm onSubmitSuccess={handleFormSubmit} />
          )}
        </main>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-blue-500"><Icons.Code /></span>
            <p>Built with React Hook Form and custom FormInput component</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
