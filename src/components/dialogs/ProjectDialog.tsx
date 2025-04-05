
import React, { useState, useEffect } from 'react';
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
import { Project, ProjectStatus, ALL_PROJECT_STATUSES, PROJECT_STATUS_LABELS, Client } from '@/types';
import { mockClients, mockUsers, mockContacts } from '@/data/mockData';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { 
  MultiSelect, 
  MultiSelectContent, 
  MultiSelectItem, 
  MultiSelectTrigger, 
  MultiSelectValue 
} from '@/components/ui/multi-select';

type ProjectDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (project: Partial<Project>) => void;
  project?: Partial<Project>;
  title: string;
};

const ProjectDialog = ({
  open,
  onClose,
  onSave,
  project,
  title
}: ProjectDialogProps) => {
  const [formData, setFormData] = useState<Partial<Project>>(
    project || {
      nom: '',
      description: '',
      status: 'appel-offre' as ProjectStatus,
      clientId: '',
      grains: [],
      chefDeProjetIds: [],
      equipeCreatifIds: [],
      equipeTechniqueIds: [],
      contactIds: []
    }
  );
  
  const [availableContacts, setAvailableContacts] = useState<any[]>([]);
  
  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);
  
  useEffect(() => {
    // Filter contacts by client when clientId changes
    if (formData.clientId) {
      const clientContacts = mockContacts.filter(contact => contact.clientId === formData.clientId);
      setAvailableContacts(clientContacts);
    } else {
      setAvailableContacts([]);
    }
  }, [formData.clientId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    // Clear selected contacts when client changes
    if (name === 'clientId') {
      setFormData({
        ...formData,
        [name]: value,
        contactIds: []
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleMultiSelectChange = (name: string, value: string[]) => {
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Remplissez les informations du projet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom du projet</Label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom || ''}
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
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
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
            
            <div className="grid gap-2">
              <Label htmlFor="clientId">Client</Label>
              <Select 
                value={formData.clientId} 
                onValueChange={(value) => handleSelectChange('clientId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Chefs de projet</Label>
              <MultiSelect 
                value={formData.chefDeProjetIds || []} 
                onValueChange={(value) => handleMultiSelectChange('chefDeProjetIds', value)}
              >
                <MultiSelectTrigger>
                  <MultiSelectValue placeholder="Sélectionner les chefs de projet" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  {mockUsers.filter(user => user.poste.includes("Chef")).map((user) => (
                    <MultiSelectItem key={user.id} value={user.id}>
                      {user.prenom} {user.nom} ({user.poste})
                    </MultiSelectItem>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
            
            <div className="grid gap-2">
              <Label>Équipe créative</Label>
              <MultiSelect 
                value={formData.equipeCreatifIds || []} 
                onValueChange={(value) => handleMultiSelectChange('equipeCreatifIds', value)}
              >
                <MultiSelectTrigger>
                  <MultiSelectValue placeholder="Sélectionner l'équipe créative" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  {mockUsers.filter(user => user.equipe === "Créatif").map((user) => (
                    <MultiSelectItem key={user.id} value={user.id}>
                      {user.prenom} {user.nom} ({user.poste})
                    </MultiSelectItem>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
            
            <div className="grid gap-2">
              <Label>Équipe technique</Label>
              <MultiSelect 
                value={formData.equipeTechniqueIds || []} 
                onValueChange={(value) => handleMultiSelectChange('equipeTechniqueIds', value)}
              >
                <MultiSelectTrigger>
                  <MultiSelectValue placeholder="Sélectionner l'équipe technique" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  {mockUsers.filter(user => user.equipe === "Technique").map((user) => (
                    <MultiSelectItem key={user.id} value={user.id}>
                      {user.prenom} {user.nom} ({user.poste})
                    </MultiSelectItem>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
            
            {formData.clientId && availableContacts.length > 0 && (
              <div className="grid gap-2">
                <Label>Contacts</Label>
                <MultiSelect 
                  value={formData.contactIds || []} 
                  onValueChange={(value) => handleMultiSelectChange('contactIds', value)}
                >
                  <MultiSelectTrigger>
                    <MultiSelectValue placeholder="Sélectionner les contacts" />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    {availableContacts.map((contact) => (
                      <MultiSelectItem key={contact.id} value={contact.id}>
                        {contact.prenom} {contact.nom} ({contact.email})
                      </MultiSelectItem>
                    ))}
                  </MultiSelectContent>
                </MultiSelect>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
