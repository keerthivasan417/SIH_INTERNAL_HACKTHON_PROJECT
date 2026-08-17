import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { Languages } from 'lucide-react';

export const LanguageSelector = () => {
  const { language, changeLanguage } = useStudent();

  return (
    <div className="language-selector-container">
      <Languages size={18} className="lang-icon" />
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
        aria-label="Select Language"
      >
        <option value="or">ଓଡ଼ିଆ (Odia)</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
