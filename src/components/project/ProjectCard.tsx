
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import StatusBadge from '@/components/status/StatusBadge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, MoreVertical, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

type ProjectCardProps = {
  project: Project;
  onClick?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onEdit?: (project: Project) => void;
  className?: string;
  compact?: boolean;
};

const ProjectCard = ({ 
  project, 
  onClick, 
  onDelete, 
  onEdit, 
  className,
  compact = false 
}: ProjectCardProps) => {
  const totalGrains = project.grains.length;
  const completedGrains = project.grains.filter(grain => grain.status === 'termine').length;
  const progressPercentage = totalGrains > 0 ? Math.round((completedGrains / totalGrains) * 100) : 0;
  
  // Count team members
  const totalTeamMembers = (project.chefDeProjetIds?.length || 0) + 
                           (project.equipeCreatifIds?.length || 0) + 
                           (project.equipeTechniqueIds?.length || 0);
  
  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) onClick(project);
  };
  
  return (
    <Card className={`${className} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{project.nom}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge status={project.status} />
            {(onEdit || onDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={e => e.stopPropagation()}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(project); }}>
                      Modifier
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
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
      
      {!compact && (
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          
          {totalTeamMembers > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{totalTeamMembers} membre{totalTeamMembers > 1 ? 's' : ''}</span>
            </div>
          )}
          
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Avancement</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${progressPercentage}%` }} 
              ></div>
            </div>
          </div>
        </CardContent>
      )}
      
      <CardFooter className="pt-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {totalGrains} {totalGrains > 1 ? 'grains' : 'grain'}
            </span>
            {project.contactIds && project.contactIds.length > 0 && (
              <Badge variant="outline" className="text-xs ml-1">
                {project.contactIds.length} contact{project.contactIds.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <Link to={`/project/${project.id}`}>Voir détails</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
