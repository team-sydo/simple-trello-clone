
import React from 'react';
import { ProjectStatus, ALL_PROJECT_STATUSES, PROJECT_STATUS_LABELS } from '@/types';
import { cn } from '@/lib/utils';

type KanbanBoardProps<T> = {
  items: T[];
  getStatus: (item: T) => ProjectStatus;
  renderItem: (item: T) => React.ReactNode;
  onDropItem?: (item: T, newStatus: ProjectStatus) => void;
  className?: string;
};

function KanbanBoard<T extends { id: string }>({
  items,
  getStatus,
  renderItem,
  onDropItem,
  className
}: KanbanBoardProps<T>) {
  // Group items by status
  const itemsByStatus = ALL_PROJECT_STATUSES.reduce((acc, status) => {
    acc[status] = items.filter(item => getStatus(item) === status);
    return acc;
  }, {} as Record<ProjectStatus, T[]>);
  
  // Handle drag and drop
  const [draggingItem, setDraggingItem] = React.useState<T | null>(null);
  
  const handleDragStart = (item: T) => {
    setDraggingItem(item);
  };
  
  const handleDragOver = (e: React.DragEvent, status: ProjectStatus) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, status: ProjectStatus) => {
    e.preventDefault();
    if (draggingItem && onDropItem) {
      onDropItem(draggingItem, status);
    }
    setDraggingItem(null);
  };
  
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4 custom-scrollbar", className)}>
      {ALL_PROJECT_STATUSES.map(status => (
        <div 
          key={status}
          className="kanban-column"
          onDragOver={(e) => handleDragOver(e, status)}
          onDrop={(e) => handleDrop(e, status)}
        >
          <h3 className="font-medium mb-4">
            {PROJECT_STATUS_LABELS[status]}
            <span className="ml-2 text-muted-foreground">
              ({itemsByStatus[status].length})
            </span>
          </h3>
          <div className="space-y-3">
            {itemsByStatus[status].map((item) => (
              <div 
                key={item.id}
                draggable={!!onDropItem}
                onDragStart={() => handleDragStart(item)}
                className={onDropItem ? "cursor-grab active:cursor-grabbing" : ""}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
