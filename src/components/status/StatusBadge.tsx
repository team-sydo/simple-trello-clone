
import React from 'react';
import { cn } from '@/lib/utils';
import { ProjectStatus, PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '@/types';

type StatusBadgeProps = {
  status: ProjectStatus;
  className?: string;
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span 
      className={cn(
        'status-badge', 
        PROJECT_STATUS_COLORS[status],
        className
      )}
    >
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
};

export default StatusBadge;
