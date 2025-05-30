
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const DashboardLayoutWrapper = ({ children, onLogout }: DashboardLayoutWrapperProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };
  
  // Custom header content with logout button
  const headerContent = (
    <div className="flex items-center justify-end">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2" 
        onClick={handleLogout}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </Button>
    </div>
  );
  
  return (
    <DashboardLayout headerContent={headerContent}>
      {children}
    </DashboardLayout>
  );
};

export default DashboardLayoutWrapper;
