import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  showAll?: boolean;
  showAllLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  showAll = false, 
  showAllLink = '#' 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-white text-2xl font-bold">{title}</h2>
      {showAll && (
        <Link
          to={showAllLink}
          className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
        >
          Show all
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
