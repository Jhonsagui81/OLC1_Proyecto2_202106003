import {  ChangeEvent } from 'react';

import './css/consola.css';


const Editor = ({editorContent2, setEditorContent2}: {editorContent2:string; setEditorContent2: (content:string) => void}) => {


  const handleInstructionsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent2(e.target.value);
  };

  
  console.log("Contenido del editor:", editorContent2);
  return (
    <div className="container-editor">
      <div className="column-instructions">
        <h2>SALIDA:</h2>
        <textarea
          rows={10}
          
          value={editorContent2}
          onChange={handleInstructionsChange}
          id="editor-instructions"
          placeholder=""
          readOnly={true}
          style={{
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        />
      </div>
      
    </div>
  );
};


export default Editor;
