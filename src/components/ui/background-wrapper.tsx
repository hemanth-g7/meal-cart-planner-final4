import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  variant?: 'signin' | 'welcome' | 'meals' | 'breakfast' | 'lunch' | 'dinner' | 'confirmation' | 'shopping';
  className?: string;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ 
  children, 
  variant = 'signin', 
  className 
}) => {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'signin':
        return 'bg-gradient-to-br from-orange-100 via-red-50 to-pink-100';
      case 'welcome':
        return 'bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100';
      case 'meals':
        return 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100';
      case 'breakfast':
        return 'bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100';
      case 'lunch':
        return 'bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100';
      case 'dinner':
        return 'bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100';
      case 'confirmation':
        return 'bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100';
      case 'shopping':
        return 'bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-200';
    }
  };

  return (
    <div className={cn(
      'min-h-screen relative overflow-hidden',
      getBackgroundStyle(),
      className
    )}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;