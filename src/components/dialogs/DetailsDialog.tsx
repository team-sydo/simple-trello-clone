
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Grain, Project, PROJECT_STATUS_LABELS, GRAIN_TYPE_LABELS } from '@/types';
import StatusBadge from '@/components/status/StatusBadge';
import { getProjectById, mockClients, mockUsers } from '@/data/mockData';
import { Pencil, Trash, Folder, FileText, User, Link2, Users, Palette, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type DetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  item: Project | Grain | null;
  itemType: 'project' | 'grain';
  onEdit?: () => void;
  onDelete?: () => void;
};

const DetailsDialog = ({
  open,
  onClose,
  item,
  itemType,
  onEdit,
  onDelete
}: DetailsDialogProps) => {
  if (!item) return null;
  
  let client;
  let project;
  if (itemType === 'project') {
    project = getProjectById((item as Project).id);
    client = project?.client;
  } else if (itemType === 'grain') {
    project = getProjectById((item as Grain).projetId);
    client = project?.client;
  }
  
  const renderTeamSection = (project: any) => {
    if (!project) return null;
    
    return (
      <div className="space-y-3 pt-2">
        <Separator />
        <h4 className="text-sm font-medium pt-1">Équipe</h4>
        
        {project.chefsDeProjet && project.chefsDeProjet.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Chefs de projet</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.chefsDeProjet.map((user: any) => (
                <Badge key={user.id} variant="outline" className="text-xs">
                  {user.prenom} {user.nom}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {project.equipeCreatif && project.equipeCreatif.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Équipe créative</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.equipeCreatif.map((user: any) => (
                <Badge key={user.id} variant="outline" className="text-xs">
                  {user.prenom} {user.nom}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {project.equipeTechnique && project.equipeTechnique.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Équipe technique</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.equipeTechnique.map((user: any) => (
                <Badge key={user.id} variant="outline" className="text-xs">
                  {user.prenom} {user.nom}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {project.contacts && project.contacts.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Contacts</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.contacts.map((contact: any) => (
                <Badge key={contact.id} variant="outline" className="text-xs">
                  {contact.prenom} {contact.nom} ({contact.email})
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {itemType === 'project' ? (
              <Folder className="h-5 w-5 text-primary" />
            ) : (
              <FileText className="h-5 w-5 text-primary" />
            )}
            <DialogTitle>
              {itemType === 'project' 
                ? (item as Project).nom 
                : (item as Grain).titre}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <StatusBadge status={item.status} />
            
            {itemType === 'grain' && (item as Grain).type && (
              <Badge variant="secondary">
                {GRAIN_TYPE_LABELS[(item as Grain).type!]}
              </Badge>
            )}
            
            {client && (
              <div className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">
                <User className="h-3 w-3" />
                <span>{client.nom}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">
              {itemType === 'project' 
                ? (item as Project).description 
                : (item as Grain).description}
            </p>
          </div>
          
          {itemType === 'grain' && (item as Grain).lien && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={(item as Grain).lien} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-primary hover:underline"
                >
                  Lien associé
                </a>
              </div>
            </div>
          )}
          
          {itemType === 'project' && renderTeamSection(project)}
          
          {itemType === 'project' && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Grains</h4>
              <div className="space-y-1">
                {(item as Project).grains.length > 0 ? (
                  (item as Project).grains.map(grain => (
                    <div key={grain.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{grain.titre}</p>
                          {grain.type && (
                            <span className="text-xs bg-secondary-foreground/10 px-1.5 py-0.5 rounded">
                              {GRAIN_TYPE_LABELS[grain.type]}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{grain.description}</p>
                      </div>
                      <StatusBadge status={grain.status} className="ml-2" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun grain pour ce projet</p>
                )}
              </div>
            </div>
          )}
          
          {itemType === 'grain' && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Projet associé</h4>
              <div className="p-2 bg-secondary rounded-md">
                <p className="text-sm font-medium">
                  {getProjectById((item as Grain).projetId)?.nom || 'Projet inconnu'}
                </p>
              </div>
            </div>
          )}
          
          {itemType === 'grain' && project && renderTeamSection(project)}
        </div>
        
        <DialogFooter className="flex gap-2">
          {onDelete && (
            <Button 
              variant="outline" 
              className="text-destructive"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          )}
          {onEdit && (
            <Button onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
