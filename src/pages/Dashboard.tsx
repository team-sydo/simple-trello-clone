
import React, { useState } from 'react';
import { Project, ProjectStatus } from '@/types';
import { mockProjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutList, LayoutGrid } from 'lucide-react';
import ProjectCard from '@/components/project/ProjectCard';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import EntityTable from '@/components/list/EntityTable';
import StatusBadge from '@/components/status/StatusBadge';
import ProjectDialog from '@/components/dialogs/ProjectDialog';
import DetailsDialog from '@/components/dialogs/DetailsDialog';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  // State
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { toast } = useToast();
  
  // Handlers
  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      id: `project${projects.length + 1}`,
      nom: projectData.nom || '',
      description: projectData.description || '',
      status: projectData.status as ProjectStatus,
      clientId: projectData.clientId || '',
      grains: []
    };
    
    setProjects([...projects, newProject]);
    setIsCreateDialogOpen(false);
    toast({
      title: 'Projet créé',
      description: `Le projet ${newProject.nom} a été créé avec succès.`
    });
  };
  
  const handleEditProject = (projectData: Partial<Project>) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(project => 
      project.id === selectedProject.id 
        ? { ...project, ...projectData } 
        : project
    ));
    setIsEditDialogOpen(false);
    setSelectedProject(null);
    toast({
      title: 'Projet modifié',
      description: 'Le projet a été modifié avec succès.'
    });
  };
  
  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    setIsDetailsDialogOpen(false);
    setSelectedProject(null);
    toast({
      title: 'Projet supprimé',
      description: 'Le projet a été supprimé avec succès.'
    });
  };
  
  const handleStatusChange = (project: Project, newStatus: ProjectStatus) => {
    setProjects(projects.map(p => 
      p.id === project.id 
        ? { ...p, status: newStatus } 
        : p
    ));
    toast({
      title: 'Statut modifié',
      description: `Le projet ${project.nom} est maintenant en statut ${newStatus}.`
    });
  };
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsDialogOpen(true);
  };
  
  // Table columns configuration
  const columns = [
    {
      header: 'Nom',
      accessorKey: 'nom' as keyof Project,
    },
    {
      header: 'Description',
      accessorKey: 'description' as keyof Project,
      cell: (project: Project) => (
        <div className="max-w-sm truncate">
          {project.description}
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status' as keyof Project,
      cell: (project: Project) => (
        <StatusBadge status={project.status} />
      )
    },
    {
      header: 'Grains',
      accessorKey: (project: Project) => project.grains.length,
    },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Projet
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
          <EntityTable
            data={projects}
            columns={columns}
            onRowClick={handleProjectClick}
            onEdit={(project) => {
              setSelectedProject(project);
              setIsEditDialogOpen(true);
            }}
            onDelete={(project) => handleDeleteProject(project.id)}
            getRowId={(project) => project.id}
          />
        </TabsContent>
        
        <TabsContent value="kanban">
          <KanbanBoard
            items={projects}
            getStatus={(project) => project.status}
            renderItem={(project) => (
              <ProjectCard
                project={project}
                onClick={handleProjectClick}
                onEdit={(project) => {
                  setSelectedProject(project);
                  setIsEditDialogOpen(true);
                }}
                onDelete={handleDeleteProject}
                compact
                className="mb-2"
              />
            )}
            onDropItem={handleStatusChange}
          />
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <ProjectDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateProject}
        title="Créer un nouveau projet"
      />
      
      <ProjectDialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedProject(null);
        }}
        onSave={handleEditProject}
        project={selectedProject || undefined}
        title="Modifier le projet"
      />
      
      <DetailsDialog
        open={isDetailsDialogOpen}
        onClose={() => {
          setIsDetailsDialogOpen(false);
          setSelectedProject(null);
        }}
        item={selectedProject}
        itemType="project"
        onEdit={() => {
          setIsDetailsDialogOpen(false);
          setIsEditDialogOpen(true);
        }}
        onDelete={() => handleDeleteProject(selectedProject?.id || '')}
      />
    </div>
  );
};

export default Dashboard;
