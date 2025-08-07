import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({ 
  value, 
  onChange, 
  min = 500, 
  max = 10000 
}) => {
  const formatBudget = (amount: number): string => {
    if (amount >= max) {
      return `$${(max / 1000).toFixed(0)}k+`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  const getBudgetDescription = (amount: number): string => {
    if (amount < 1000) return 'Basic website with essential features';
    if (amount < 2500) return 'Professional website with custom design';
    if (amount < 5000) return 'Advanced website with premium features';
    if (amount < 7500) return 'Complex project with custom functionality';
    return 'Enterprise-level solution with full customization';
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      {/* Budget Display */}
      <div className="text-center">
        <motion.div
          key={value}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full text-white mb-4"
        >
          <div className="text-center">
            <DollarSign className="mx-auto mb-1" size={24} />
            <div className="text-2xl font-bold">{formatBudget(value)}</div>
          </div>
        </motion.div>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          {getBudgetDescription(value)}
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Progress Track */}
          <motion.div
            className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Slider Thumb */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-4 border-cyan-500 rounded-full shadow-lg cursor-pointer"
            style={{ left: `calc(${percentage}% - 12px)` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
        
        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={250}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Budget Range Labels */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>${min}</span>
        <span>${max}+</span>
      </div>

      {/* Budget Tiers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { range: '$500-1k', label: 'Basic' },
          { range: '$1k-2.5k', label: 'Standard' },
          { range: '$2.5k-5k', label: 'Premium' },
          { range: '$5k+', label: 'Enterprise' },
        ].map((tier, index) => {
          const isActive = 
            (index === 0 && value < 1000) ||
            (index === 1 && value >= 1000 && value < 2500) ||
            (index === 2 && value >= 2500 && value < 5000) ||
            (index === 3 && value >= 5000);

          return (
            <motion.div
              key={tier.label}
              className={`p-3 rounded-lg text-center border-2 transition-colors duration-200 ${
                isActive
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-sm">{tier.label}</div>
              <div className="text-xs">{tier.range}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetSlider;