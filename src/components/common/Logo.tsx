import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', variant = 'dark', withText = true }) => {
  // Size mappings
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12',
  };

  // Text color based on variant
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center ${withText ? 'gap-2' : ''}`}
    >
      {/* Logo mark */}
      <div className={`relative ${sizeClasses[size]} aspect-square`}>
        {/* Base shape */}
        <div className="absolute inset-0 bg-zim-green rounded-lg transform -rotate-6"></div>
        
        {/* Yellow accent */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-yellow-500 rounded-tr-lg rounded-br-lg"></div>
        
        {/* Black star */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4/5 h-4/5 bg-black transform rotate-45"></div>
          </div>
        </div>
        
        {/* Red stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-red-600"></div>
        
        {/* Building icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <HomeIcon className="h-1/2 w-1/2 text-white z-10" />
        </div>
      </div>
      
      {/* Logo text */}
      {withText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight ${textColor} text-xl leading-none`}>
            Dzimba
          </span>
          <span className="text-xs text-zim-green font-medium leading-none">
            Property Management
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo; 