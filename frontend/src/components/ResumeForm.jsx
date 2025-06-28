import { useState } from 'react'
import SectionEditor from './SectionEditor'

const ResumeForm = ({ data, onChange, onEnhance, onSave, onDownload }) => {
  const [activeTab, setActiveTab] = useState('summary')
  const [isLoading, setIsLoading] = useState(false)

  const handleSectionChange = (section, value) => {
    onChange({ target: { name: section, value } })
  }

  const handleAddItem = (section) => {
    const template = {
      experience: { id: Date.now(), role: '', company: '', duration: '' },
      education: { id: Date.now(), degree: '', university: '', year: '' }
    }
    const newItems = [...data[section], template[section]]
    onChange({ target: { name: section, value: newItems } })
  }

  const handleRemoveItem = (section, id) => {
    const newItems = data[section].filter(item => item.id !== id)
    onChange({ target: { name: section, value: newItems } })
  }

  const handleItemChange = (section, id, field, value) => {
    const newItems = data[section].map(item => 
      item.id === id ? { ...item, [field]: value } : item
    )
    onChange({ target: { name: section, value: newItems } })
  }

  const handleSaveWithLoading = async () => {
    setIsLoading(true)
    try {
      await onSave()
    } finally {
      setIsLoading(false)
    }
  }

  const renderEditableList = (section, fields) => (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </h3>
      {data[section].map((item) => (
        <div key={item.id} className="flex gap-4 mb-4 items-center">
          {fields.map(field => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={item[field]}
              onChange={(e) => handleItemChange(section, item.id, field, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
          ))}
          <button 
            onClick={() => handleRemoveItem(section, item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        onClick={() => handleAddItem(section)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add {section.charAt(0).toUpperCase() + section.slice(1)}
      </button>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Your Resume</h2>
      
      <div className="flex border-b mb-6">
        {['summary', 'experience', 'education', 'skills'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-lg p-6 min-h-64">
        {activeTab === 'summary' && (
          <SectionEditor
            title="Summary"
            content={data.summary}
            onSave={(content) => handleSectionChange('summary', content)}
            onEnhance={(content) => onEnhance('summary', content)}
          />
        )}

        {activeTab === 'experience' && renderEditableList('experience', ['role', 'company', 'duration'])}

        {activeTab === 'education' && renderEditableList('education', ['degree', 'university', 'year'])}

        {activeTab === 'skills' && (
          <SectionEditor
            title="Skills"
            content={data.skills.join(', ')}
            onSave={(content) => handleSectionChange('skills', content.split(',').map(s => s.trim()))}
            onEnhance={(content) => onEnhance('skills', content)}
          />
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button 
          onClick={handleSaveWithLoading}
          disabled={isLoading}
          className={`bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Saving...' : 'Save Resume'}
        </button>
        <button 
          onClick={onDownload}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Download as JSON
        </button>
      </div>
    </div>
  )
}

export default ResumeForm;