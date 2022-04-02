import * as S from '../styles/TaskList'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import {  useState } from 'react';
import { useTask } from '../hooks/TaskProvider';

export function TaskList() {
  const { 
    tasks, 
    newTaskTitle, 
    setNewTaskTitle, 
    handleCreateNewTask, 
    handleDeleteTask,
    handleSetTaskAsCompleted, 
  } = useTask();
  return (
    <S.TaskListContainer>
      <S.TaskListHeader>
        <S.TaskListTitle>Minhas tasks</S.TaskListTitle>

        <S.TaskInputGroup>
          <S.TaskInput 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <S.AddTaskButton type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </S.AddTaskButton>
        </S.TaskInputGroup>
      </S.TaskListHeader>

      <S.TaskMain>
        <S.TasksList>
          {tasks.map(task => (
            <S.TaskLine key={task.id}>
              <S.Task className={task.completed ? 'completed' : ''} data-testid="task" >
                <S.CheckboxContainer>
                  <S.CheckboxInput 
                    type="checkbox"
                    readOnly
                    checked={task.completed}
                    onClick={()=>{}}
                  />
                  <span className="checkmark"></span>
                </S.CheckboxContainer>
                <p data-testid="task">{task.title}</p>
              </S.Task>
              <S.ButtonContainer>
                <S.AddTaskButton type="button" data-testid="complete-task-button" onClick={()=>handleSetTaskAsCompleted(task.id, task.completed)}>
                  <FiCheckSquare size={16} color="#fff"/>
                </S.AddTaskButton>
                <S.RemoveTaskButton type="button" data-testid="remove-task-button" onClick={()=>handleDeleteTask(task.id)}>
                  <FiTrash size={16}/>
                </S.RemoveTaskButton>
              </S.ButtonContainer>
            </S.TaskLine>
          ))}
        </S.TasksList>
      </S.TaskMain>
    </S.TaskListContainer>
  )
}