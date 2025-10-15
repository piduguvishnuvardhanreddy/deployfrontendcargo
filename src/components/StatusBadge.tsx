import { cn } from '../lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'assigned' | 'on_route' | 'delivered' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    pending: 'bg-gray-100 text-gray-800',
    assigned: 'bg-blue-100 text-blue-800',
    on_route: 'bg-yellow-100 text-yellow-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const labels = {
    pending: 'Pending',
    assigned: 'Assigned',
    on_route: 'On Route',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', variants[status])}>
      {labels[status]}
    </span>
  );
}
