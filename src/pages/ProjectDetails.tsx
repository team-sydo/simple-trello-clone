import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project, Grain, GrainStatus } from '@/types';
import { getProjectById, mockProjects, mockGrains } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, LayoutList, LayoutGrid, Trash, Edit } from 'lucide-react';
import GrainCard from '@/components/grain/GrainCard';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import EntityTable from '@/components/list/EntityTable';
import StatusBadge from '@/components/status/StatusBadge';
import GrainDialog from '@/components/dialogs/GrainDialog';
import ProjectDialog from '@/components/dialogs/ProjectDialog';
import DetailsDialog from '@/components/dialogs/DetailsDialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State
  const [project, setProject] = useState<Project | null>(null);
  const [grains, setGrains] = useState<Grain[]>([]);
  const [isCreateGrainDialogOpen, setIsCreateGrainDialogOpen] = useState(false);
  const [isEditGrainDialogOpen, setIsEditGrainDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedGrain, setSelectedGrain] = useState<Grain | null>(null);
  
  // Load project data
  useEffect(() => {
    if (!projectId) {
      navigate('/');
      return;
    }
    
    const projectData = getProjectById(projectId);
    if (!projectData) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Projet non trouvé'
      });
      navigate('/');
      return;
    }
    
    setProject(projectData as Project);
    setGrains(projectData.grains);
  }, [projectId, navigate]);
  
  if (!project) {
    return <div>Chargement...</div>;
  }
  
  // Handlers
  const handleCreateGrain = (grainData: Partial<Grain>) => {
    const newGrain: Grain = {
      id: `grain${Date.now()}`,
      titre: grainData.titre || '',
      description: grainData.description || '',
      status: grainData.status as GrainStatus,
      projetId: project.id
    };
    
    // Update local state
    const updatedGrains = [...grains, newGrain];
    setGrains(updatedGrains);
    
    // Update project
    setProject({
      ...project,
      grains: updatedGrains
    });
    
    setIsCreateGrainDialogOpen(false);
    toast({
      title: 'Grain créé',
      description: `Le grain ${newGrain.titre} a été créé avec succès.`
    });
  };
  
  const handleEditGrain = (grainData: Partial<Grain>) => {
    if (!selectedGrain) return;
    
    const updatedGrains = grains.map(grain => 
      grain.id === selectedGrain.id 
        ? { ...grain, ...grainData } 
        : grain
    );
    
    // Update local state
    setGrains(updatedGrains);
    
    // Update project
    setProject({
      ...project,
      grains: updatedGrains
    });
    
    setIsEditGrainDialogOpen(false);
    setSelectedGrain(null);
    toast({
      title: 'Grain modifié',
      description: 'Le grain a été modifié avec succès.'
    });
  };
  
  const handleDeleteGrain = (grainId: string) => {
    const updatedGrains = grains.filter(grain => grain.id !== grainId);
    
    // Update local state
    setGrains(updatedGrains);
    
    // Update project
    setProject({
      ...project,
      grains: updatedGrains
    });
    
    setIsDetailsDialogOpen(false);
    setSelectedGrain(null);
    toast({
      title: 'Grain supprimé',
      description: 'Le grain a été supprimé avec succès.'
    });
  };
  
  const handleEditProject = (projectData: Partial<Project>) => {
    const updatedProject = {
      ...project,
      ...projectData
    };
    
    // Update local state
    setProject(updatedProject);
    
    setIsEditProjectDialogOpen(false);
    toast({
      title: 'Projet modifié',
      description: 'Le projet a été modifié avec succès.'
    });
  };
  
  const handleDeleteProject = () => {
    toast({
      title: 'Projet supprimé',
      description: 'Le projet a été supprimé avec succès.'
    });
    navigate('/');
  };
  
  const handleGrainStatusChange = (grain: Grain, newStatus: GrainStatus) => {
    const updatedGrains = grains.map(g => 
      g.id === grain.id 
        ? { ...g, status: newStatus } 
        : g
    );
    
    // Update local state
    setGrains(updatedGrains);
    
    // Update project
    setProject({
      ...project,
      grains: updatedGrains
    });
    
    toast({
      title: 'Statut modifié',
      description: `Le grain ${grain.titre} est maintenant en statut ${newStatus}.`
    });
  };
  
  const handleGrainClick = (grain: Grain) => {
    setSelectedGrain(grain);
    setIsDetailsDialogOpen(true);
  };
  
  // Table columns configuration
  const columns = [
    {
      header: 'Titre',
      accessorKey: 'titre' as keyof Grain,
    },
    {
      header: 'Description',
      accessorKey: 'description' as keyof Grain,
      cell: (grain: Grain) => (
        <div className="max-w-sm truncate">
          {grain.description}
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status' as keyof Grain,
      cell: (grain: Grain) => (
        <StatusBadge status={grain.status} />
      )
    }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{project.nom}</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Détails du projet</CardTitle>
              <CardDescription>Informations générales sur le projet</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditProjectDialogOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive"
                onClick={handleDeleteProject}
              >
                <Trash className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              <p className="text-sm text-muted-foreground">
                Client: {(project as any).client?.nom || 'Non assigné'}
              </p>
            </div>
            <p>{project.description}</p>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Avancement</span>
                <span>
                  {grains.filter(g => g.status === 'termine').length} / {grains.length} grains terminés
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ 
                    width: `${grains.length > 0 
                      ? Math.round((grains.filter(g => g.status === 'termine').length / grains.length) * 100)
                      : 0}%` 
                  }} 
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grains du projet</h2>
        <Button onClick={() => setIsCreateGrainDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Grain
        </Button>
      </div>
      
      <Tabs defaultValue="list">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">
              <LayoutList className="mr-2 h-4 w-4" />
              Liste
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Kanban
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="list" className="space-y-4">
          {grains.length > 0 ? (
            <EntityTable
              data={grains}
              columns={columns}
              onRowClick={handleGrainClick}
              onEdit={(grain) => {
                setSelectedGrain(grain);
                setIsEditGrainDialogOpen(true);
              }}
              onDelete={(grain) => handleDeleteGrain(grain.id)}
              getRowId={(grain) => grain.id}
            />
          ) : (
            <div className="text-center py-8 bg-secondary rounded-md">
              <p className="text-muted-foreground">Aucun grain pour ce projet.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsCreateGrainDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un grain
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="kanban">
          {grains.length > 0 ? (
            <KanbanBoard
              items={grains}
              getStatus={(grain) => grain.status}
              renderItem={(grain) => (
                <GrainCard
                  grain={grain}
                  onClick={handleGrainClick}
                  onEdit={(grain) => {
                    setSelectedGrain(grain);
                    setIsEditGrainDialogOpen(true);
                  }}
                  onDelete={handleDeleteGrain}
                  className="mb-2"
                />
              )}
              onDropItem={handleGrainStatusChange}
            />
          ) : (
            <div className="text-center py-8 bg-secondary rounded-md">
              <p className="text-muted-foreground">Aucun grain pour ce projet.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsCreateGrainDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un grain
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <GrainDialog
        open={isCreateGrainDialogOpen}
        onClose={() => setIsCreateGrainDialogOpen(false)}
        onSave={handleCreateGrain}
        projectId={project.id}
        title="Créer un nouveau grain"
      />
      
      <GrainDialog
        open={isEditGrainDialogOpen}
        onClose={() => {
          setIsEditGrainDialogOpen(false);
          setSelectedGrain(null);
        }}
        onSave={handleEditGrain}
        grain={selectedGrain || undefined}
        title="Modifier le grain"
      />
      
      <ProjectDialog
        open={isEditProjectDialogOpen}
        onClose={() => setIsEditProjectDialogOpen(false)}
        onSave={handleEditProject}
        project={project}
        title="Modifier le projet"
      />
      
      <DetailsDialog
        open={isDetailsDialogOpen}
        onClose={() => {
          setIsDetailsDialogOpen(false);
          setSelectedGrain(null);
        }}
        item={selectedGrain}
        itemType="grain"
        onEdit={() => {
          setIsDetailsDialogOpen(false);
          setIsEditGrainDialogOpen(true);
        }}
        onDelete={() => handleDeleteGrain(selectedGrain?.id || '')}
      />
    </div>
  );
};

export default ProjectDetails;
