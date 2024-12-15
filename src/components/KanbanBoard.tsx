'use client'
import { DndContext, closestCenter, DragOverlay, useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store/store';
import { updateDocumentStatus } from '../app/features/documentSlice';
import SortableItem from './SortableItem';
import { useState } from 'react';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

const DroppableColumn = ({ id, title, children }: any) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        width: '300px',
        minHeight: '500px',
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.documents);
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns: Record<
    'in-progress' | 'under-review' | 'completed',
    { title: string; id: string; items: { id: string; title: string; status: string }[] }
  > = {
    'in-progress': { title: 'В работе', id: 'in-progress', items: [] },
    'under-review': { title: 'На проверке', id: 'under-review', items: [] },
    'completed': { title: 'Завершено', id: 'completed', items: [] },
  };

  documents.forEach((doc) => {
    columns[doc.status].items.push(doc);
  });

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (over) {
      const sourceStatus = active.data.current?.status;
      const destinationStatus = over.id; // ID целевой колонки

      if (sourceStatus && sourceStatus !== destinationStatus) {
        dispatch(
          updateDocumentStatus({
            id: active.id,
            status: destinationStatus,
          })
        );
      }
    }
  };

  const activeDocument = documents.find((doc) => doc.id === activeId);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]} 
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        {Object.entries(columns).map(([id, column]) => (
          <SortableContext
            key={id}
            items={column.items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <DroppableColumn id={id} title={column.title}>
              {column.items.map((doc) => (
                 <div
                 key={doc.id}
                 style={{opacity: activeId === doc.id ? 0 : 1 }}
               >
                 <SortableItem doc={doc} />
               </div>
              ))}
            </DroppableColumn>
          </SortableContext>
        ))}
      </div>

      {/* DragOverlay должен быть глобальным */}
      <DragOverlay>
        {activeDocument ? (
          <div
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              color: 'black',
              width: '282px',
              height :'34px'
            }}
          >
            {activeDocument.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
