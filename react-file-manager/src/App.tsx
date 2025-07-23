import React from "react";
import Toolbar from "./components/Toolbar";
import { FolderTree } from "./components/FolderTree";
import { FileList } from "./components/FileList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex flex-1 min-h-0">
          <FolderTree />
          <FileList />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
