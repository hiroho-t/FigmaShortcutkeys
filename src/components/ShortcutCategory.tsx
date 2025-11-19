import { Card } from './ui/card';
import { ShortcutItem } from './ShortcutItem';
import { Badge } from './ui/badge';

interface Shortcut {
  id: string;
  name: string;
  mac: string;
  windows: string;
}

interface Category {
  title: string;
  icon: string;
  shortcuts: Shortcut[];
}

interface ShortcutCategoryProps {
  category: Category;
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
}

export function ShortcutCategory({ category, checkedItems, onToggle }: ShortcutCategoryProps) {
  const completedCount = category.shortcuts.filter(s => checkedItems.has(s.id)).length;
  const totalCount = category.shortcuts.length;
  const isAllCompleted = completedCount === totalCount;

  return (
    <Card className={`overflow-hidden transition-all ${isAllCompleted ? 'border-green-300 bg-green-50/50' : 'border-gray-200'}`}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="text-white">{category.title}</h2>
          </div>
          <Badge variant={isAllCompleted ? 'default' : 'secondary'} className="bg-white/20 text-white border-white/30">
            {completedCount} / {totalCount}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {category.shortcuts.map((shortcut) => (
            <ShortcutItem
              key={shortcut.id}
              shortcut={shortcut}
              isChecked={checkedItems.has(shortcut.id)}
              onToggle={() => onToggle(shortcut.id)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
