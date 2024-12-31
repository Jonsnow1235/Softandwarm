import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ADMIN_KEY = 'softsecret18';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const [searchParams] = useSearchParams();
  const keyParam = searchParams.get('key') || searchParams.get('Key');
  
  if (keyParam?.toLowerCase() !== ADMIN_KEY.toLowerCase()) {
    return <div className="p-8 text-center">Access denied</div>;
  }
  
  return <>{children}</>;
}