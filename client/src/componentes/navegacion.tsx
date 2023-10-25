import React, { useState } from 'react';
import axios from 'axios';
import './css/NavigationBar.css';

interface NavigationBarProps {
  setEditorContent: (content: string) => void;
  setEditorContent2: (content: string) => void;
  addNewTab: (title: string, content: string) => void; // Agrega una nueva pestaña
  getEditorContent: () => string
   setTabs: React.Dispatch<React.SetStateAction<Array<{ title: string; content: string }>>>;
  tabs: Array<{ title: string; content: string }>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ setEditorContent, setEditorContent2, addNewTab, getEditorContent, setTabs, tabs }) => {
  const [isArchivoOpen, setIsArchivoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);


  const handleMouseEnter = () => {
    setIsArchivoOpen(true);
  };

  //ABRIR UN ARCHIVO
  const handleOpenFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.qc'; // Define el tipo de archivo que deseas abrir (en este caso, .qc)
    input.onchange = (e) => {
      if (e.target instanceof HTMLInputElement) {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          handleFileSelected(file);
        }
      }
    };
    input.click();
  };

  //NUEVO PESTANA
  const handleNewFile = () => {
    const fileName = prompt('Ingrese el nombre del nuevo archivo');
    if (fileName) {
      // Crea un nuevo archivo con contenido vacío
      const newFileContent = '';
      const newTabTitle = fileName; // Usa el nombre como título de la pestaña

      // Agrega el nuevo archivo a las pestañas
      addNewTab(newTabTitle, newFileContent);

      // Abre el nuevo archivo en el editor
      setEditorContent(newFileContent);
    }
  };
  

  //CARGAR PESTANA AL ABRIR ARCHIVO
  const handleFileSelected = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      if (fileContent) {
        // Llama a la función para establecer el contenido en el editor
        setEditorContent(fileContent);
        // Agregar una nueva pestaña con el nombre del archivo y su contenido
        addNewTab(file.name, fileContent);
      }
    };
    reader.readAsText(file);
  };

  const handleMouseLeave = () => {
    setIsArchivoOpen(false);
  };

  //PETICION PARA EJECUTAR 
  const handleSendData = async () => {
    const fileContent = getEditorContent();
    try {
      const response = await fetch('http://localhost:5000/interpreter/interpretar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Asegúrate de configurar el tipo de contenido correcto
        },
        body: JSON.stringify({ data: fileContent }), // Envía el contenido del editor en el cuerpo de la solicitud
      });
  
      if (response.ok) {
        // La solicitud se completó con éxito
        const data = await response.text();
        console.log("LA RESPUESTA ESA: "+data)
        console.log('Solicitud POST exitosa');

        setEditorContent2(data);

      } else {
        // La solicitud falló
        console.error('Error en la solicitud POST');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };

  //PARA GUARDAR DOCUMENTOS 
  const handleSaveFile = () => {
    const fileName = prompt('Ingrese el nombre del archivo');
    if (fileName) {
      const fileContent = getEditorContent(); // Obtiene el contenido del editor
      const blob = new Blob([fileContent], { type: 'text/plain' });
  
      // Crea una URL para el archivo
      const url = URL.createObjectURL(blob);
  
      // Crea un enlace invisible para descargar el archivo
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.style.display = 'none';
  
      // Agrega el enlace al documento y simula un clic
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      URL.revokeObjectURL(url)
      // Crea una nueva pestaña con el nombre del archivo y el contenido actual
      addNewTab(fileName, fileContent);
      
    }
  };

  const handleDeleteTab = (index:any) => {
    // Verifica que haya pestañas para eliminar
    if (tabs.length === 0) {
      return;
    }
  
    // Crea una copia de las pestañas
    const updatedTabs = [...tabs];
  
    // Elimina la pestaña actual basada en el índice
    updatedTabs.splice(index, 1);
  
    // Actualiza el estado de las pestañas
    setTabs(updatedTabs);
  
    // Verifica si la pestaña eliminada es la pestaña activa
    if (activeTab === index) {
      // Si es la pestaña activa, actualiza la pestaña activa a la primera pestaña o a null si no hay pestañas restantes
      setActiveTab(updatedTabs.length > 0 ? 0 : null);
    } else if (activeTab > index) {
      // Si la pestaña eliminada está antes de la pestaña activa, debes ajustar el índice de la pestaña activa
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <div className="navbar">
      <div
        className="nav-item"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Archivo
        {isArchivoOpen && (
          <div className="archivo-menu">
            <div onClick={handleNewFile}>Nuevo Archivo</div>
            <div onClick={handleOpenFile}>Abrir Archivo</div>
            <div onClick={handleSaveFile}>Guardar</div>
            <div onClick={handleDeleteTab}>Eliminar Pestaña</div>
          </div>
        )}
      </div>
      <div className="nav-item" onClick={handleSendData}>Ejecutar</div>
      <div className="nav-item">Reportes</div>
    </div>
  );
};

export default NavigationBar;
