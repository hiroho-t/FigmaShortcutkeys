import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';
import { motion, Variants } from 'motion/react';

interface Shortcut {
  id: string;
  name: string;
  mac: string;
  windows: string;
}

interface ShortcutItemProps {
  shortcut: Shortcut;
  isChecked: boolean;
  onToggle: () => void;
  showCompleted?: boolean;
}

const wrapperVariants: Variants = {
  visible: {
    opacity: 1,
    height: 'auto',
    marginBottom: 12,
    borderWidth: 0,
    scale: 1,
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
    marginBottom: 0,
    borderWidth: 0,
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 1
    }
  }
};

export function ShortcutItem({ shortcut, isChecked, onToggle, showCompleted = false }: ShortcutItemProps) {
  const shouldHide = isChecked && !showCompleted;

  return (
    <motion.div
      initial={false}
      animate={shouldHide ? "hidden" : "visible"}
      variants={wrapperVariants}
      className={`rounded-lg overflow-hidden ${
        isChecked
          ? 'bg-[#B897FF]/10'
          : 'bg-white/10 hover:bg-white/20'
      } cursor-pointer hover:shadow-md transition-colors`}
      style={{ borderStyle: 'none' }}
      onClick={onToggle}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center justify-center">
          <Checkbox
            checked={isChecked}
            onCheckedChange={onToggle}
            className={isChecked ? 'border-purple-600 data-[state=checked]:bg-purple-600' : ''}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className={`text-[14px] sm:text-base transition-all ${isChecked ? 'text-gray-500 line-through' : 'text-white'}`}>
            {shortcut.name}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-gray-500">Mac:</span>
            <Badge variant="outline" className={`rounded-full font-mono ${isChecked ? 'bg-purple-100' : 'bg-purple-50'}`}>
              {shortcut.mac}
            </Badge>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-gray-500">Win:</span>
            <Badge variant="outline" className={`rounded-full font-mono ${isChecked ? 'bg-purple-100' : 'bg-blue-50'}`}>
              {shortcut.windows}
            </Badge>
          </div>
          <div className="sm:hidden">
            <Badge variant="outline" className={`rounded-full font-mono ${isChecked ? 'bg-purple-100' : 'bg-purple-50'}`}>
              {shortcut.mac}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
