import React, { useState } from 'react';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string; status: 'pending' | 'completed' }) => void;
  initialValues?: {
    title: string;
    description: string;
    status: 'pending' | 'completed';
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [status, setStatus] = useState<'pending' | 'completed'>(initialValues?.status || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    if (!initialValues) {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{initialValues ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
        >
          <option value="pending">Pendente</option>
          <option value="completed">Concluída</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        {initialValues ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
};

export default TaskForm; 