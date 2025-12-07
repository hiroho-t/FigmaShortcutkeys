import { useState, useEffect } from 'react';
import { ShortcutChecklist } from './components/ShortcutChecklist';
import { Progress } from './components/ui/progress';
import { Button } from './components/ui/button';
import { RotateCcw, Keyboard } from 'lucide-react';
import ResetContainer from './imports/ResetContainer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImage from 'figma:asset/6efaeea9ee828b976ecf8c218ae2034f48593b27.png';

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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ImageWithFallback src={logoImage} alt="Figmakey Logo" className="h-[28px] w-auto" />
              <h1 className="text-4xl font-bold text-white tracking-[0.02em] font-[Product_Sans] text-[22px]">Figmakey</h1>
            </div>
            <button onClick={handleReset} type="button" className="hover:opacity-80 transition-opacity">
              <ResetContainer />
            </button>
          </div>

          <div className="mb-2">
            <p className="text-[#B897FF] font-[Product_Sans] font-bold">
              {checkedItems.size} / {totalItems} 
              <span className="text-[rgb(255,255,255)] ml-[8px] font-[Product_Sans] font-bold text-[32px] mt-[0px] mr-[0px] mb-[0px]">
                {totalItems > 0 ? Math.round(progress) : 0}<span className="text-[14px] mt-[0px] mr-[0px] mb-[0px] ml-[1px]">%</span>
              </span>
            </p>
          </div>
          <Progress value={progress} className="h-[8px] bg-white/10 [&>[data-slot=progress-indicator]]:bg-[#874FFF]" />
        </div>

        {/* Checklist */}
        <ShortcutChecklist
          checkedItems={checkedItems}
          onToggle={handleToggle}
          onTotalItemsChange={setTotalItems}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400">
          <p className="text-[14px]">チェック状態は、自動的にブラウザに保存。</p>
          <p className="text-xs mt-2">©︎ StartWith Inc.</p>
        </div>
      </div>
    </div>
  );
}