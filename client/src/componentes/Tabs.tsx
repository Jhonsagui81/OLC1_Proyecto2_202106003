import React, { useState } from 'react';
import './css/tab.css'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0); // Índice de la pestaña activa
  const [documents, setDocuments] = useState([
    { title: 'Documento 1', content: 'Contenido del documento 1' },
    { title: 'Documento 2', content: 'Contenido del documento 2' },
  ]);

  const handleTabClick = (index:number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      {documents.map((document, index) => (
        <div
          key={index}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => handleTabClick(index)}
        >
          {document.title}
        </div>
      ))}
      <div className="editor-content">
        {documents[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
