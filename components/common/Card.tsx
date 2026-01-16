import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated';
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, variant = 'default' }) => {
  const baseClasses = `bg-white rounded-lg overflow-hidden transition-all duration-300`;
  
  const variantClasses = {
    default: 'shadow-md hover:shadow-xl',
    elevated: 'shadow-lg hover:shadow-2xl hover:-translate-y-1'
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${
    onClick ? 'cursor-pointer' : ''
  } ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
