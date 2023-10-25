import React from 'react';
import './css/tab.css'

interface TabProps {
  title: string;
  content: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ title, content, active, onClick }) => {
  return (
    <div className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
      {title}
    </div>
  );
};

export default Tab;
