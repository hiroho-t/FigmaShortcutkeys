import { useState, useEffect } from 'react';
import { ShortcutChecklist } from './components/ShortcutChecklist';
import { Progress } from './components/ui/progress';
import { Button } from './components/ui/button';
import { RotateCcw, Keyboard } from 'lucide-react';

export default function App() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('figma-shortcuts-progress');
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('figma-shortcuts-progress', JSON.stringify([...checkedItems]));
  }, [checkedItems]);

  const handleToggle = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleReset = () => {
    if (confirm('すべてのチェックをリセットしてもよろしいですか？')) {
      setCheckedItems(new Set());
    }
  };

  const progress = totalItems > 0 ? (checkedItems.size / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Keyboard className="w-10 h-10 text-purple-600" />
            <h1 className="text-purple-900">Figmakey</h1>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-gray-600 mb-1">学習進捗</p>
                <p className="text-purple-900">
                  {checkedItems.size} / {totalItems} 
                  <span className="text-gray-500 ml-2">
                    ({totalItems > 0 ? Math.round(progress) : 0}%)
                  </span>
                </p>
              </div>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              リセット
            </Button>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Checklist */}
        <ShortcutChecklist
          checkedItems={checkedItems}
          onToggle={handleToggle}
          onTotalItemsChange={setTotalItems}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>チェック状態は自動的にブラウザに保存されます</p>
        </div>
      </div>
    </div>
  );
}