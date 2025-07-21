import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'signin' | 'welcome' | 'meals' | 'breakfast' | 'lunch' | 'dinner' | 'confirmation' | 'shopping';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
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

  const getFloatingElements = () => {
    switch (variant) {
      case 'signin':
        return (
          <>
            <div className="absolute top-20 left-10 w-16 h-16 bg-orange-200/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-red-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-32 left-20 w-20 h-20 bg-pink-200/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          </>
        );
      case 'welcome':
        return (
          <>
            <div className="absolute top-16 right-16 w-24 h-24 bg-blue-200/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-16 w-16 h-16 bg-purple-200/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-10 w-12 h-12 bg-indigo-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        );
      case 'meals':
        return (
          <>
            <div className="absolute top-10 left-1/4 text-6xl opacity-20 animate-float">🍽️</div>
            <div className="absolute bottom-20 right-1/4 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🥗</div>
            <div className="absolute top-1/3 right-10 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🍳</div>
          </>
        );
      case 'breakfast':
        return (
          <>
            <div className="absolute top-20 left-20 text-5xl opacity-20 animate-float">🌅</div>
            <div className="absolute bottom-32 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🥞</div>
            <div className="absolute top-1/2 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>☕</div>
          </>
        );
      case 'lunch':
        return (
          <>
            <div className="absolute top-16 right-16 text-5xl opacity-20 animate-float">☀️</div>
            <div className="absolute bottom-24 left-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🍛</div>
            <div className="absolute top-1/3 left-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🥘</div>
          </>
        );
      case 'dinner':
        return (
          <>
            <div className="absolute top-20 left-16 text-5xl opacity-20 animate-float">🌙</div>
            <div className="absolute bottom-28 right-24 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🍝</div>
            <div className="absolute top-1/2 right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🍷</div>
          </>
        );
      case 'shopping':
        return (
          <>
            <div className="absolute top-16 left-16 text-5xl opacity-20 animate-float">🛒</div>
            <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>📝</div>
            <div className="absolute top-1/3 right-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>✅</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      'min-h-screen relative overflow-hidden',
      getBackgroundStyle(),
      className
    )}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        {getFloatingElements()}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;