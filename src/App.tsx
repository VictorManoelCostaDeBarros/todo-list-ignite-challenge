import styles from './App.module.css';
import { Header } from './components/Header';
import { PlusCircle, ClipboardText } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import './global.css';
import { Task } from './components/Task';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddNewTask() {
    if(newTask === ''){
      // Num aplicação real colocaria um toast.
      return window.alert('Preencha com um tarefa para adicionar')
    }
    const task = {
      id: uuidv4() as string,
      title: newTask,
      isDone: false
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  function updateTask(id: string) {
    const tasksArr = [...tasks]
    const taskIndex = tasksArr.findIndex(task => task.id === id)
    console.log(taskIndex)
    tasksArr[taskIndex].isDone = !tasksArr[taskIndex].isDone
    setTasks(tasksArr)
  }

  function deleteTask(id: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => task.id !== id)
    setTasks(tasksWithoutDeleteOne)
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.newTask}>
          <input 
            type="text" 
            placeholder='Adicionar uma nova tarefa'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />

          <button
            type='button'
            onClick={handleAddNewTask}
          >
            Criar
            <PlusCircle/>
          </button>
        </div>

        <main className={styles.main}>
          <div className={styles.header}>
            <span className={styles.allTasks}>Tarefas criadas <span className={styles.badget}>{tasks.length}</span></span>
            <span className={styles.doneTasks}>Concluídas <span className={styles.badget}>{tasks.length > 0 ? `${tasks.filter(task => task.isDone).length} de ${tasks.length}` : '0'}</span></span>
          </div>

          <div className={styles.content}>
            {
              tasks.length === 0 ? 
              <div className={styles.emptyContent}>
                <ClipboardText size={56} />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Cire tarefas e organize seus item a fazer</span>
              </div> 
              : 
              tasks.map(task => (
                <Task 
                  key={task.id} 
                  task={task}
                  onDeleteTask={deleteTask}
                  onUpdateTask={updateTask}
                />
              ))
            }
          </div>
        </main>
      </div>

    </div>
  )
}

