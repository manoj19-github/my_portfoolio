'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { Moon, Sun, Plus, Trash2, CreditCard as Edit, Save } from 'lucide-react';
import { supabase, Project, Skill } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function AdminPanel() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project>>({});
  const [editingSkill, setEditingSkill] = useState<Partial<Skill>>({});

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('display_order');
    if (data) setProjects(data);
  };

  const fetchSkills = async () => {
    const { data } = await supabase.from('skills').select('*').order('display_order');
    if (data) setSkills(data);
  };

  const handleSaveProject = async () => {
    if (editingProject.id) {
      await supabase.from('projects').update(editingProject).eq('id', editingProject.id);
      toast({ title: 'Project updated successfully' });
    } else {
      await supabase.from('projects').insert([editingProject]);
      toast({ title: 'Project created successfully' });
    }
    setEditingProject({});
    fetchProjects();
  };

  const handleDeleteProject = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    toast({ title: 'Project deleted' });
    fetchProjects();
  };

  const handleSaveSkill = async () => {
    if (editingSkill.id) {
      await supabase.from('skills').update(editingSkill).eq('id', editingSkill.id);
      toast({ title: 'Skill updated successfully' });
    } else {
      await supabase.from('skills').insert([editingSkill]);
      toast({ title: 'Skill created successfully' });
    }
    setEditingSkill({});
    fetchSkills();
  };

  const handleDeleteSkill = async (id: string) => {
    await supabase.from('skills').delete().eq('id', id);
    toast({ title: 'Skill deleted' });
    fetchSkills();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex items-center gap-4">
            <Label htmlFor="theme-toggle">Dark Mode</Label>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </div>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingProject.title || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    placeholder="Project Title"
                  />
                </div>
                <div>
                  <Label>Live URL</Label>
                  <Input
                    value={editingProject.live_url || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, live_url: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingProject.description || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Tech Stack (comma-separated)</Label>
                  <Input
                    value={editingProject.tech_stack?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        tech_stack: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingProject.is_featured || false}
                      onCheckedChange={(checked) =>
                        setEditingProject({ ...editingProject, is_featured: checked })
                      }
                    />
                    <Label>Featured</Label>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleSaveProject} className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Save className="mr-2 h-4 w-4" />
                  Save Project
                </Button>
                {editingProject.id && (
                  <Button variant="outline" onClick={() => setEditingProject({})}>
                    Cancel
                  </Button>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    {project.is_featured && <Badge>Featured</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech_stack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editingSkill.name || ''}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, name: e.target.value })
                    }
                    placeholder="React"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={editingSkill.category || ''}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, category: e.target.value })
                    }
                    placeholder="Frontend"
                  />
                </div>
                <div>
                  <Label>Proficiency (0-100)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editingSkill.proficiency || 80}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        proficiency: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleSaveSkill} className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Save className="mr-2 h-4 w-4" />
                  Save Skill
                </Button>
                {editingSkill.id && (
                  <Button variant="outline" onClick={() => setEditingSkill({})}>
                    Cancel
                  </Button>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <Card key={skill.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                    <Badge variant="secondary">{skill.proficiency}%</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingSkill(skill)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Appearance Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred theme
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input value="santramanoj1997@gmail.com" disabled />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value="+91 9748159138" disabled />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input value="linkedin.com/in/manoj-santra-38ab181ba" disabled />
                </div>
                <div>
                  <Label>GitHub</Label>
                  <Input value="github.com/manoj19-github" disabled />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
