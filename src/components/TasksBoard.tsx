import React from 'react';
import { Task, initialTasks } from './tasksData';
import { Card, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Stack } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ArrowForward, ArrowBack } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const emptyTask: Omit<Task, 'id'> = {
  title: '',
  description: '',
  status: 'Todo',
  assignedTo: '',
};

const statusOrder: Task['status'][] = ['Todo', 'In Progress', 'Done'];

type TasksByStatus = { [K in Task['status']]: Task[] };

function groupTasks(tasks: Task[]): TasksByStatus {
  return statusOrder.reduce((acc, status) => {
    acc[status] = tasks.filter(t => t.status === status);
    return acc;
  }, {} as TasksByStatus);
}

const TasksBoard: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Omit<Task, 'id'>>(emptyTask);

  const handleOpenAdd = (status: Task['status']) => {
    setEditId(null);
    setForm({ ...emptyTask, status });
    setDialogOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditId(task.id);
    setForm({ ...task });
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setForm(emptyTask);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (form.title.trim() === '') return;
    if (editId === null) {
      // Add
      const newTask: Task = {
        ...form,
        id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      };
      setTasks([newTask, ...tasks]);
    } else {
      // Edit
      setTasks(tasks.map(t => t.id === editId ? { ...form, id: editId } : t));
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (id: number, direction: 'forward' | 'back') => {
    setTasks(tasks.map(task => {
      if (task.id !== id) return task;
      const idx = statusOrder.indexOf(task.status);
      const newIdx = direction === 'forward' ? idx + 1 : idx - 1;
      if (newIdx < 0 || newIdx >= statusOrder.length) return task;
      return { ...task, status: statusOrder[newIdx] };
    }));
  };

  // Drag-and-drop handlers
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const sourceStatus = source.droppableId as Task['status'];
    const destStatus = destination.droppableId as Task['status'];
    if (sourceStatus === destStatus && source.index === destination.index) return;
    const grouped = groupTasks(tasks);
    const movedTask = grouped[sourceStatus][source.index];
    // Remove from source
    grouped[sourceStatus].splice(source.index, 1);
    // Insert into destination
    grouped[destStatus].splice(destination.index, 0, { ...movedTask, status: destStatus });
    // Flatten back to array
    const newTasks = statusOrder.flatMap(status => grouped[status]);
    setTasks(newTasks);
  };

  const groupedTasks = groupTasks(tasks);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Tasks (Kanban Board)
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, width: '100%' }}>
          {statusOrder.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ background: '#181818', borderRadius: 3, p: 2, minHeight: 400, display: 'flex', flexDirection: 'column', transition: '0.2s', boxShadow: snapshot.isDraggingOver ? '0 0 0 2px #fff' : undefined }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', letterSpacing: 1 }}>{status}</Typography>
                    <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => handleOpenAdd(status)} sx={{ background: '#fff', color: '#111', fontWeight: 700, borderRadius: 2, boxShadow: 'none', ':hover': { background: '#eee' } }}>Add</Button>
                  </Stack>
                  <Stack spacing={2} flex={1}>
                    {groupedTasks[status].map((task, idx) => (
                      <Draggable draggableId={task.id.toString()} index={idx} key={task.id}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ background: '#222', borderRadius: 2, p: 2, color: '#fff', display: 'flex', flexDirection: 'column', gap: 1, opacity: snapshot.isDragging ? 0.7 : 1, boxShadow: snapshot.isDragging ? '0 0 8px #fff' : undefined }}
                          >
                            <Typography variant="subtitle1" fontWeight={700}>{task.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                            <Typography variant="caption" color="text.secondary">Assigned to: {task.assignedTo || 'Unassigned'}</Typography>
                            <Stack direction="row" spacing={1} mt={1}>
                              <IconButton size="small" onClick={() => moveTask(task.id, 'back')} disabled={status === 'Todo'} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}><ArrowBack fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => moveTask(task.id, 'forward')} disabled={status === 'Done'} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}><ArrowForward fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => handleOpenEdit(task)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}><EditIcon fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => handleDelete(task.id)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}><DeleteIcon fontSize="small" /></IconButton>
                            </Stack>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, letterSpacing: 1, background: '#111', color: '#fff' }}>
          {editId === null ? 'Add Task' : 'Edit Task'}
        </DialogTitle>
        <DialogContent sx={{ background: '#181818' }}>
          <Stack spacing={2} mt={1}>
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth required autoFocus InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline minRows={2} InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Assigned To" name="assignedTo" value={form.assignedTo} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ background: '#181818' }}>
          <Button onClick={handleClose} sx={{ color: '#fff' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ background: '#fff', color: '#111', fontWeight: 700, ':hover': { background: '#eee' } }}>
            {editId === null ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TasksBoard; 