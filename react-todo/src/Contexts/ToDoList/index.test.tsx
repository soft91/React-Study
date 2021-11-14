import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { ToDoListProvider } from "./index";
import { ToDoListContext } from "Contexts";

describe('ToDoList Context', () => {
  it('renders component correctly', () => {
    const ChildComponent = () => {
      const { toDoList } = useContext(ToDoListContext);
    
      return (
        <div>
          {toDoList.map((toDo) => (
            <div key={toDo}>{toDo}</div>
          ))}
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  it('uses addToDo function', () => {
    const ChildComponent = () => {
      const { toDoList, addToDo } = useContext(ToDoListContext);
    
      return (
        <div>
          <div onClick={() => addToDo('study react 1')}>Add Todo</div>
          <div>
            {toDoList.map((toDo) => (
              <div key={toDo}>{toDo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const button = screen.getByText('Add ToDo');
    fireEvent.click(button);
    expect(screen.getByText('study react 1')).toBeInTheDocument();
  });

  it('uses deleteToDo function', () => {
    const ChildComponent = () => {
      const { toDoList, deleteToDo } = useContext(ToDoListContext);
    
      return (
        <div>
          <div>
            {toDoList.map((toDo, index) => (
              <div key={toDo} onClick={() => deleteToDo(index)}>{toDo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <ToDoListProvider>
        <ChildComponent />
      </ToDoListProvider>
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);
    expect(toDoItem).not.toBeInTheDocument();
  })
});