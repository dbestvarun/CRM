export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  assignedTo?: string;
};

export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Call Dairy Fresh for order confirmation',
    description: 'Confirm the next month order for Nutricana Milking Special.',
    status: 'Todo',
    assignedTo: 'Amit',
  },
  {
    id: 2,
    title: 'Send invoice to Green Pastures',
    description: 'Send the invoice for last month’s delivery.',
    status: 'In Progress',
    assignedTo: 'Priya',
  },
  {
    id: 3,
    title: 'Follow up with Milk Masters',
    description: 'Check if they need more Nutricana Milking Plus.',
    status: 'Todo',
    assignedTo: 'Amit',
  },
  {
    id: 4,
    title: 'Schedule delivery for Nutricana Livestock',
    description: 'Arrange transport for 400kg Milking Gold.',
    status: 'Done',
    assignedTo: 'Priya',
  },
]; 