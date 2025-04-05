
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grain, GrainStatus, ALL_PROJECT_STATUSES, PROJECT_STATUS_LABELS, GrainType, ALL_GRAIN_TYPES, GRAIN_TYPE_LABELS } from '@/types';

type GrainDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (grain: Partial<Grain>) => void;
  grain?: Partial<Grain>;
  projectId?: string;
  title: string;
};

const GrainDialog = ({
  open,
  onClose,
  onSave,
  grain,
  projectId,
  title
}: GrainDialogProps) => {
  const [formData, setFormData] = React.useState<Partial<Grain>>(
    grain || {
      titre: '',
      description: '',
      status: 'appel-offre' as GrainStatus,
      projetId: projectId || '',
      type: undefined,
      lien: ''
    }
  );
  
  React.useEffect(() => {
    if (grain) {
      setFormData(grain);
    } else if (projectId) {
      setFormData({
        titre: '',
        description: '',
        status: 'appel-offre' as GrainStatus,
        projetId: projectId,
        type: undefined,
        lien: ''
      });
    }
  }, [grain, projectId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Remplissez les informations du grain.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                name="titre"
                value={formData.titre || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value as GrainType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_GRAIN_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {GRAIN_TYPE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="lien">Lien</Label>
              <Input
                id="lien"
                name="lien"
                value={formData.lien || ''}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value as GrainStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_PROJECT_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {PROJECT_STATUS_LABELS[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GrainDialog;
