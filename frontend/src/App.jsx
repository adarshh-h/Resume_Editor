import { useState } from 'react'
import FileUploader from './components/FileUploader'
import ResumeForm from './components/ResumeForm'

function App() {
  const [resumeData, setResumeData] = useState({
    name: '',
    summary: '',
    experience: [],
    education: [],
    skills: []
  })
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleFileUpload = (file) => {
    setFileUploaded(true)
    setResumeData({
      name: 'John Doe',
      summary: 'Experienced developer with 5+ years...',
      experience: [
        { id: 1, role: 'Senior Developer', company: 'Tech Corp', duration: '2020-Present' }
      ],
      education: [
        { id: 1, degree: 'B.Sc Computer Science', university: 'State University', year: '2019' }
      ],
      skills: ['JavaScript', 'React', 'Python']
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setResumeData({ ...resumeData, [name]: value })
  }

  const enhanceSection = async (section, content) => {
    try {
      const response = await fetch('http://localhost:8000/ai-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content })
      })
      const data = await response.json()
      return data.enhancedContent
    } catch (error) {
      console.error('AI enhance error:', error)
      return content
    }
  }

  const saveResume = async () => {
    try {
      await fetch('http://localhost:8000/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      })
      alert('Resume saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  const downloadResume = () => {
    const dataStr = JSON.stringify(resumeData, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'resume.json'
    link.click()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Editor</h1>
      {!fileUploaded ? (
        <FileUploader onUpload={handleFileUpload} />
      ) : (
        <ResumeForm 
          data={resumeData}
          onChange={handleInputChange}
          onEnhance={enhanceSection}
          onSave={saveResume}
          onDownload={downloadResume}
        />
      )}
    </div>
  )
}

export default App