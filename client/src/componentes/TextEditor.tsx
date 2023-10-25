import {  ChangeEvent } from 'react';

import './css/Editor.css';


const Editor = ({editorContent, setEditorContent}: {editorContent:string; setEditorContent: (content:string) => void}) => {


  const handleInstructionsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
  };

  
  console.log("Contenido del editor:", editorContent);
  return (
    <div className="container-editor">
      <div className="column-instructions">
        <h2>ENTRADA: </h2>
        <textarea
          rows={10}
          
          value={editorContent}
          onChange={handleInstructionsChange}
          id="editor-instructions"
          placeholder="Escribe tus instrucciones aquí"
        />
      </div>
      
    </div>
  );
};


export default Editor;
