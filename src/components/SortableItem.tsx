"use client"
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  doc: { id: string; title: string; status: string };
}

const SortableItem = ({ doc }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: doc.id,
      data: { status: doc.status },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? 'transform 100ms ease' : undefined,
    padding: '8px',
    margin: '4px 0',
    background: '#f4f4f4',
    borderRadius: '4px',
    color: 'black',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {doc.title}
    </div>
  );
};

export default SortableItem;
