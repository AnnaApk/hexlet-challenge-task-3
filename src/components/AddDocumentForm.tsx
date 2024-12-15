"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDocument } from '../app/features/documentSlice';

const AddDocumentForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addDocument({ title }));
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название документа"
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddDocumentForm;
