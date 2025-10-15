import { Truck } from 'lucide-react';

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Truck className="w-12 h-12 text-blue-600 animate-pulse" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
