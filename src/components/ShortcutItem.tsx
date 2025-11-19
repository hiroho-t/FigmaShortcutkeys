import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

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
}

export function ShortcutItem({ shortcut, isChecked, onToggle }: ShortcutItemProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
        isChecked
          ? 'bg-green-50 border-green-300'
          : 'bg-white border-gray-200 hover:border-purple-300'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-center">
        <Checkbox
          checked={isChecked}
          onCheckedChange={onToggle}
          className={isChecked ? 'border-green-600' : ''}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`transition-all ${isChecked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
          {shortcut.name}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-gray-500">Mac:</span>
          <Badge variant="outline" className={`font-mono ${isChecked ? 'bg-green-100' : 'bg-purple-50'}`}>
            {shortcut.mac}
          </Badge>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-gray-500">Win:</span>
          <Badge variant="outline" className={`font-mono ${isChecked ? 'bg-green-100' : 'bg-blue-50'}`}>
            {shortcut.windows}
          </Badge>
        </div>
        <div className="sm:hidden">
          <Badge variant="outline" className="font-mono">
            {shortcut.mac}
          </Badge>
        </div>
        {isChecked && (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 flex-shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
