import { ReactNode, useState } from 'react';
import { Card } from './ui/card';
import { ShortcutItem } from './ShortcutItem';
import { Badge } from './ui/badge';
import { motion, Variants } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';

interface Shortcut {
  id: string;
  name: string;
  mac: string;
  windows: string;
}

interface Category {
  title: string;
  icon: ReactNode;
  shortcuts: Shortcut[];
}

interface ShortcutCategoryProps {
  category: Category;
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
}

const categoryVariants: Variants = {
  visible: {
    opacity: 1,
    height: 'auto',
    scale: 1,
    marginBottom: 24, // corresponds to space-y-6 (1.5rem = 24px)
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 1
    }
  },
  hidden: {
    opacity: 0,
    height: 0,
    scale: 0.95,
    marginBottom: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export function ShortcutCategory({ category, checkedItems, onToggle }: ShortcutCategoryProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const completedCount = category.shortcuts.filter(s => checkedItems.has(s.id)).length;
  const totalCount = category.shortcuts.length;
  const isAllCompleted = completedCount === totalCount;
  
  // Force hide category if all items are completed
  const shouldHideCategory = isAllCompleted;

  const handleBadgeClick = (e: React.MouseEvent) => {
    // Stop propagation just in case
    e.stopPropagation();
    
    // Always allow toggling state, even if seemingly disabled visually
    // This fixes any edge cases where state might be out of sync
    setShowCompleted(!showCompleted);
  };

  const isInteractive = !isAllCompleted && completedCount > 0;

  return (
    <motion.div
      layout
      initial={shouldHideCategory ? "hidden" : "visible"}
      animate={shouldHideCategory ? "hidden" : "visible"}
      variants={categoryVariants}
    >
      <Card className={`overflow-hidden transition-all border-none shadow-none ${isAllCompleted ? 'bg-[#B897FF]/10' : 'bg-white/10'}`}>
        <div className="px-6 py-4 border-b border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-white">{category.icon}</span>
              <h2 className="text-white text-[14px]">{category.title}</h2>
            </div>
            <Badge 
              variant={isAllCompleted ? 'default' : 'secondary'} 
              className={`rounded-full bg-white/10 text-white border-none flex items-center gap-2 transition-colors relative z-10 select-none ${
                isInteractive
                  ? 'cursor-pointer hover:bg-white/30' 
                  : isAllCompleted ? 'cursor-default opacity-70' : 'cursor-default'
              }`}
              onClick={isInteractive ? handleBadgeClick : undefined}
            >
              <span>{completedCount} / {totalCount}</span>
              {isInteractive && (showCompleted ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />)}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="">
            {category.shortcuts.map((shortcut) => (
              <ShortcutItem
                key={shortcut.id}
                shortcut={shortcut}
                isChecked={checkedItems.has(shortcut.id)}
                onToggle={() => onToggle(shortcut.id)}
                showCompleted={showCompleted}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
