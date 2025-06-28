import { useState } from 'react';

const SectionEditor = ({ title, content, onSave, onEnhance }) => {
  const [value, setValue] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEnhance = async () => {
    const enhancedContent = await onEnhance(value);
    setValue(enhancedContent);
  };

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {isEditing ? (
        <>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full min-h-32 p-3 border rounded mb-3"
          />
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button 
              onClick={handleEnhance}
              className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
            >
              Enhance with AI
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded mb-3">{value}</p>
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default SectionEditor;