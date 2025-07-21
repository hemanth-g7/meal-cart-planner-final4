import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EnhancedIconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  glowEffect?: boolean;
  pulseEffect?: boolean;
}

const EnhancedIconButton: React.FC<EnhancedIconButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className,
  type = 'button',
  glowEffect = false,
  pulseEffect = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl border-0';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl border-0';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl border-0';
      case 'warning':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl border-0';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl border-0';
      case 'outline':
        return 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg';
      case 'ghost':
        return 'bg-transparent hover:bg-white/20 backdrop-blur-sm text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl border-0';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
      case 'xl':
        return 'w-7 h-7';
      default:
        return 'w-5 h-5';
    }
  };

  const getLayoutClasses = () => {
    switch (iconPosition) {
      case 'top':
        return 'flex-col';
      case 'bottom':
        return 'flex-col-reverse';
      case 'right':
        return 'flex-row-reverse';
      default:
        return 'flex-row';
    }
  };

  const getGap = () => {
    return iconPosition === 'top' || iconPosition === 'bottom' ? 'gap-2' : 'gap-3';
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl font-semibold',
        getVariantStyles(),
        getSizeStyles(),
        glowEffect && 'shadow-2xl hover:shadow-3xl',
        pulseEffect && 'animate-pulse',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        className
      )}
    >
      {/* Glow effect overlay */}
      {glowEffect && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className={cn(
        'flex items-center justify-center',
        getLayoutClasses(),
        getGap(),
        loading && 'opacity-0'
      )}>
        {Icon && (iconPosition === 'left' || iconPosition === 'top') && (
          <Icon className={getIconSize()} />
        )}
        <span className="font-semibold">{children}</span>
        {Icon && (iconPosition === 'right' || iconPosition === 'bottom') && (
          <Icon className={getIconSize()} />
        )}
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
      </div>
    </Button>
  );
};

export default EnhancedIconButton;