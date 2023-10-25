import React, { useState } from 'react';
import NavigationBar from './componentes/navegacion';
import Console from './componentes/Consola';
import Editor from './componentes/TextEditor';
import './App.css';

function App() {
  const [editorContent, setEditorContent] = useState('');
  const [editorContent2, setEditorContent2] = useState('');
  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);

  const addNewTab = (title:string, content:string) => {
    const newTabs = [...tabs, { title, content }];
    setTabs(newTabs);
    setActiveTab(newTabs.length - 1);
  };

  const handleTabClick = (index:number) => {
    setActiveTab(index);
    setEditorContent(tabs[index].content);
  };

  const getEditorContent = () => {
    return editorContent;
  };

  return (
    <div className="App">
      <div className="navigationBar">
        <NavigationBar setEditorContent={setEditorContent} setEditorContent2={setEditorContent2} addNewTab={addNewTab} getEditorContent={getEditorContent} setTabs = {setTabs}  tabs={tabs}/>
      </div>
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <div key={index} className={`tab ${index === activeTab ? 'active' : ''}`} onClick={() => handleTabClick(index)}>
            {tab.title}
          </div>
        ))}
      </div>
      <div className="content">
        <div className="editor">
          <Editor editorContent={editorContent} setEditorContent={setEditorContent} />
        </div>
        <div className="editor">
          <Console editorContent2={editorContent2} setEditorContent2={setEditorContent2} />
        </div>
      </div>
    </div>
  );
}

export default App;
