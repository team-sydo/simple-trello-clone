
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Grain, Project, CLIENT_STATUS_COLORS, PROJECT_STATUS_LABELS } from '@/types';
import StatusBadge from '@/components/status/StatusBadge';
import { getProjectById, mockClients } from '@/data/mockData';
import { Pencil, Trash, Folder, FileText, User } from 'lucide-react';

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
  if (itemType === 'project') {
    client = mockClients.find(c => c.id === (item as Project).clientId);
  } else if (itemType === 'grain') {
    const project = getProjectById((item as Grain).projetId);
    client = project?.client;
  }
  
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
          
          {itemType === 'project' && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Grains</h4>
              <div className="space-y-1">
                {(item as Project).grains.length > 0 ? (
                  (item as Project).grains.map(grain => (
                    <div key={grain.id} className="flex items-center justify-between p-2 bg-secondary rounded-md">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{grain.titre}</p>
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
