import { Trash } from 'phosphor-react';

import styles from './styles.module.css';

interface Task { 
  id: string;
  title: string;
  isDone: boolean;
}

interface Props {
  task: Task;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string) => void;
}

export function Task({ task, onDeleteTask, onUpdateTask }: Props) {
  return (
    <div className={styles.task}>
      <input type="checkbox" checked={task.isDone} onChange={() => onUpdateTask(task.id)} />
      <p style={{ textDecorationLine: task.isDone ? 'line-through' : 'none' }}>{task.title}</p>
      <button 
        type="button"
        onClick={() => onDeleteTask(task.id)}
      >
        <Trash size={20} />
      </button>
    </div>
  )
}