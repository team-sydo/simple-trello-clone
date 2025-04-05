
import React from 'react';
import { Grain, Project } from '@/types';
import StatusBadge from '@/components/status/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type GrainCardProps = {
  grain: Grain;
  onClick?: (grain: Grain) => void;
  onDelete?: (grainId: string) => void;
  onEdit?: (grain: Grain) => void;
  className?: string;
};

const GrainCard = ({ 
  grain, 
  onClick, 
  onDelete, 
  onEdit, 
  className 
}: GrainCardProps) => {
  
  const handleCardClick = () => {
    if (onClick) onClick(grain);
  };
  
  return (
    <Card 
      className={`${className} hover:shadow-md transition-shadow`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">{grain.titre}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge status={grain.status} className="text-xs" />
            {(onEdit || onDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={e => e.stopPropagation()}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(grain); }}>
                      Modifier
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={(e) => { e.stopPropagation(); onDelete(grain.id); }}
                    >
                      Supprimer
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-1">
        <p className="text-sm text-muted-foreground line-clamp-2">{grain.description}</p>
      </CardContent>
    </Card>
  );
};

export default GrainCard;
