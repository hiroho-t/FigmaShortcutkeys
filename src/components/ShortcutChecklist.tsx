import { useEffect } from 'react';
import { ShortcutCategory } from './ShortcutCategory';

interface ShortcutItem {
  id: string;
  name: string;
  mac: string;
  windows: string;
}

interface Category {
  title: string;
  icon: string;
  shortcuts: ShortcutItem[];
}

const categories: Category[] = [
  {
    title: 'ファイル・アプリケーション',
    icon: '🗂️',
    shortcuts: [
      { id: 'new-file', name: '新規ファイルを作成', mac: '⌘ + N', windows: 'Ctrl + N' },
      { id: 'open-action', name: 'アクションを開く', mac: '⌘ + P / ⌘ + K', windows: 'Ctrl + P / Ctrl + K' },
      { id: 'search', name: 'ファイル内を検索', mac: '⌘ + F', windows: 'Ctrl + F' },
      { id: 'close-tab', name: '現在のタブを閉じる', mac: '⌘ + W', windows: 'Ctrl + W' },
      { id: 'reopen-tab', name: '閉じたタブを再度開く', mac: '⇧ + ⌘ + T', windows: 'Shift + Ctrl + T' },
      { id: 'quit-app', name: 'アプリを終了', mac: '⌘ + Q', windows: 'Alt + F4' },
    ],
  },
  {
    title: 'ツール選択',
    icon: '🛠️',
    shortcuts: [
      { id: 'move-tool', name: '移動ツール', mac: 'V', windows: 'V' },
      { id: 'frame-tool', name: 'フレームツール', mac: 'F (A)', windows: 'F (A)' },
      { id: 'slice-tool', name: 'スライスツール', mac: 'S', windows: 'S' },
      { id: 'rectangle-tool', name: '長方形ツール', mac: 'R', windows: 'R' },
      { id: 'line-tool', name: '線ツール', mac: 'L', windows: 'L' },
      { id: 'arrow-tool', name: '矢印ツール', mac: 'Shift + L', windows: 'Shift + L' },
      { id: 'ellipse-tool', name: '楕円ツール', mac: 'O', windows: 'O' },
      { id: 'text-tool', name: 'テキストツール', mac: 'T', windows: 'T' },
      { id: 'pencil-tool', name: '鉛筆ツール', mac: 'Shift + P', windows: 'Shift + P' },
      { id: 'eyedropper-tool', name: 'スポイト', mac: 'I', windows: 'I' },
      { id: 'comment-tool', name: 'コメントを追加', mac: 'C', windows: 'C' },
      { id: 'annotation-tool', name: 'アノテーション', mac: 'Y', windows: 'Y' },
    ],
  },
  {
    title: '選択と移動',
    icon: '🖱️',
    shortcuts: [
      { id: 'select-all', name: 'すべてを選択', mac: '⌘ + A', windows: 'Ctrl + A' },
      { id: 'deselect', name: '選択を解除', mac: 'Esc', windows: 'Esc' },
      { id: 'select-inverse', name: '選択範囲を反転', mac: '⇧ + ⌘ + A', windows: 'Shift + Ctrl + A' },
      { id: 'select-nested', name: '階層を無視して選択', mac: '⌘ + クリック', windows: 'Ctrl + クリック' },
      { id: 'select-child', name: '子レイヤーを選択', mac: 'Enter', windows: 'Enter' },
      { id: 'select-parent', name: '親レイヤーを選択', mac: 'Shift + Enter', windows: 'Shift + Enter' },
      { id: 'select-next-sibling', name: '次の兄弟レイヤーを選択', mac: 'Tab', windows: 'Tab' },
      { id: 'select-matching', name: '同じプロパティのものを選択', mac: '⌥ + ⌘ + A', windows: 'Alt + Ctrl + A' },
      { id: 'move-1px', name: '1px単位で移動', mac: '矢印キー', windows: '矢印キー' },
      { id: 'move-10px', name: '10px単位で移動', mac: 'Shift + 矢印キー', windows: 'Shift + 矢印キー' },
    ],
  },
  {
    title: 'オブジェクトとレイヤー',
    icon: '📦',
    shortcuts: [
      { id: 'copy', name: 'コピー', mac: '⌘ + C', windows: 'Ctrl + C' },
      { id: 'paste', name: 'ペースト', mac: '⌘ + V', windows: 'Ctrl + V' },
      { id: 'cut', name: '切り取り', mac: '⌘ + X', windows: 'Ctrl + X' },
      { id: 'duplicate', name: '複製', mac: '⌘ + D', windows: 'Ctrl + D' },
      { id: 'drag-duplicate', name: 'ドラッグして複製', mac: '⌥ + ドラッグ', windows: 'Alt + ドラッグ' },
      { id: 'paste-replace', name: '貼り付けて置換', mac: '⇧ + ⌘ + R', windows: 'Shift + Ctrl + R' },
      { id: 'undo', name: '元に戻す', mac: '⌘ + Z', windows: 'Ctrl + Z' },
      { id: 'group', name: 'グループ化', mac: '⌘ + G', windows: 'Ctrl + G' },
      { id: 'ungroup', name: 'グループ化解除', mac: '⌘ + ⇧ + G', windows: 'Ctrl + Shift + G' },
      { id: 'frame-selection', name: 'フレーム化', mac: '⌥ + ⌘ + G', windows: 'Alt + Ctrl + G' },
      { id: 'rename-layer', name: 'レイヤー名を変更', mac: '⌘ + R', windows: 'Ctrl + R' },
      { id: 'lock-unlock', name: 'レイヤーのロック/解除', mac: 'Shift + ⌘ + L', windows: 'Shift + Ctrl + L' },
      { id: 'show-hide', name: 'レイヤーの表示/非表示', mac: 'Shift + ⌘ + H', windows: 'Shift + Ctrl + H' },
      { id: 'bring-front', name: 'レイヤーを最前面へ', mac: ']', windows: ']' },
      { id: 'send-back', name: 'レイヤーを最背面へ', mac: '[', windows: '[' },
      { id: 'bring-forward', name: 'レイヤーを1つ前面へ', mac: '⌘ + ]', windows: 'Ctrl + ]' },
      { id: 'send-backward', name: 'レイヤーを1つ背面へ', mac: '⌘ + [', windows: 'Ctrl + [' },
      { id: 'collapse-layers', name: 'すべてのレイヤーを折りたたむ', mac: '⌥ + L', windows: 'Alt + L' },
      { id: 'edit-element', name: '要素を編集', mac: 'Enter', windows: 'Enter' },
      { id: 'flip-h', name: '水平に反転', mac: '⇧ + H', windows: 'Shift + H' },
      { id: 'flip-v', name: '垂直に反転', mac: '⇧ + V', windows: 'Shift + V' },
      { id: 'rotate', name: '傾きを変更', mac: '⌥ + ⌘ + 上下矢印', windows: 'Alt + Ctrl + 上下矢印' },
      { id: 'resize-center', name: '中央からサイズ調整', mac: '⌥ + ドラッグ', windows: 'Alt + ドラッグ' },
      { id: 'resize-ratio', name: '縦横比を維持してサイズ調整', mac: 'Shift + ドラッグ', windows: 'Shift + ドラッグ' },
      { id: 'crop', name: '画像のトリミング', mac: '⌘ + ドラッグ', windows: 'Ctrl + ドラッグ' },
      { id: 'measure-distance', name: '選択範囲までの距離測定', mac: '⌥', windows: 'Alt' },
    ],
  },
  {
    title: 'スタイルとプロパティ',
    icon: '🎨',
    shortcuts: [
      { id: 'copy-props', name: 'プロパティをコピー', mac: '⌥ + ⌘ + C', windows: 'Alt + Ctrl + C' },
      { id: 'paste-props', name: 'プロパティをペースト', mac: '⌥ + ⌘ + V', windows: 'Alt + Ctrl + V' },
      { id: 'copy-png', name: 'PNGとしてコピー', mac: '⇧ + ⌘ + C', windows: 'Shift + Ctrl + C' },
      { id: 'swap-fill-stroke', name: '塗りと線を入れ替える', mac: 'Shift + X', windows: 'Shift + X' },
      { id: 'remove-fill', name: '塗りを削除', mac: '⌥ + /', windows: 'Alt + /' },
      { id: 'remove-stroke', name: '線を削除', mac: '⇧ + /', windows: 'Shift + /' },
      { id: 'opacity', name: '不透明度を調節', mac: '数字キー', windows: '数字キー' },
      { id: 'opacity-0', name: '不透明度を0%にする', mac: '00', windows: '00' },
      { id: 'opacity-100', name: '不透明度を100%にする', mac: '0', windows: '0' },
      { id: 'create-component', name: 'コンポーネント作成', mac: '⌥ + ⌘ + K', windows: 'Alt + Ctrl + K' },
      { id: 'detach-instance', name: 'インスタンス切り離し', mac: '⌥ + ⌘ + B', windows: 'Alt + Ctrl + B' },
      { id: 'component-search', name: 'コンポーネントを検索', mac: 'Shift + I', windows: 'Shift + I' },
      { id: 'last-plugin', name: '最後に使ったプラグイン', mac: '⌥ + ⌘ + P', windows: 'Alt + Ctrl + P' },
      { id: 'place-image', name: '画像を配置', mac: '⇧ + ⌘ + K', windows: 'Shift + Ctrl + K' },
    ],
  },
  {
    title: 'テキスト編集',
    icon: '✏️',
    shortcuts: [
      { id: 'text-bold', name: '太字 (Bold)', mac: '⌘ + B', windows: 'Ctrl + B' },
      { id: 'text-italic', name: '斜体 (Italic)', mac: '⌘ + I', windows: 'Ctrl + I' },
      { id: 'text-underline', name: '下線 (Underline)', mac: '⌘ + U', windows: 'Ctrl + U' },
      { id: 'text-strikethrough', name: '打ち消し線', mac: '⇧ + ⌘ + X', windows: 'Shift + Ctrl + X' },
      { id: 'text-link', name: 'リンクを作成', mac: '⇧ + ⌘ + U', windows: 'Shift + Ctrl + U' },
      { id: 'text-numbered-list', name: '番号リストに変更', mac: 'Shift + 7', windows: 'Shift + 7' },
      { id: 'text-bullet-list', name: '箇条書きリストに変更', mac: 'Shift + 8', windows: 'Shift + 8' },
      { id: 'text-align-left', name: 'テキスト左揃え', mac: '⌥ + ⌘ + L', windows: 'Alt + Ctrl + L' },
      { id: 'text-align-center', name: 'テキスト中央揃え', mac: '⌥ + ⌘ + T', windows: 'Alt + Ctrl + T' },
      { id: 'text-align-right', name: 'テキスト右揃え', mac: '⌥ + ⌘ + R', windows: 'Alt + Ctrl + R' },
      { id: 'text-align-justify', name: 'テキスト両端揃え', mac: '⌥ + ⌘ + J', windows: 'Alt + Ctrl + J' },
      { id: 'font-size-adjust', name: 'フォントサイズ調整', mac: '⇧ + ⌘ + > と <', windows: 'Shift + Ctrl + > と <' },
      { id: 'letter-spacing-adjust', name: '文字間隔の調整', mac: '⌘ + > と <', windows: 'Ctrl + > と <' },
      { id: 'line-height-adjust', name: '行間の調整', mac: '⌥ + ⇧ + ⌘ + > と <', windows: 'Alt + Shift + Ctrl + > と <' },
    ],
  },
  {
    title: '整列と配置',
    icon: '📐',
    shortcuts: [
      { id: 'align-left', name: '左揃え', mac: '⌥ + A', windows: 'Alt + A' },
      { id: 'align-right', name: '右揃え', mac: '⌥ + D', windows: 'Alt + D' },
      { id: 'align-top', name: '上揃え', mac: '⌥ + W', windows: 'Alt + W' },
      { id: 'align-bottom', name: '下揃え', mac: '⌥ + S', windows: 'Alt + S' },
      { id: 'align-h-center', name: '水平方向中央揃え', mac: '⌥ + H', windows: 'Alt + H' },
      { id: 'align-v-center', name: '垂直方向中央揃え', mac: '⌥ + V', windows: 'Alt + V' },
      { id: 'distribute-h', name: '等間隔に分布（水平）', mac: 'Control + ⌥ + H', windows: 'Ctrl + Alt + H' },
      { id: 'distribute-v', name: '等間隔に分布（垂直）', mac: 'Control + ⌥ + V', windows: 'Ctrl + Alt + V' },
      { id: 'add-auto-layout', name: 'オートレイアウト追加', mac: '⇧ + A', windows: 'Shift + A' },
      { id: 'remove-auto-layout', name: 'オートレイアウト削除', mac: '⌥ + ⇧ + A', windows: 'Alt + Shift + A' },
    ],
  },
  {
    title: 'ベクター編集',
    icon: '✍️',
    shortcuts: [
      { id: 'outline', name: '線のアウトライン化', mac: 'Shift + ⌘ + O', windows: 'Shift + Ctrl + O' },
      { id: 'paint-bucket', name: 'ペイントバケツ', mac: 'Shift + B', windows: 'Shift + B' },
      { id: 'curve-tool', name: 'ベンドツール', mac: '⌘', windows: 'Ctrl' },
      { id: 'shape-builder', name: 'シェイプビルダーツール', mac: 'M', windows: 'M' },
      { id: 'cut-tool', name: '切り取り（シェイプ編集時）', mac: 'X', windows: 'X' },
      { id: 'lasso-tool', name: 'ラッソ選択', mac: 'Q', windows: 'Q' },
      { id: 'delete-anchor', name: 'アンカーを削除して補完', mac: 'Shift + Backspace', windows: 'Shift + Backspace' },
    ],
  },
  {
    title: '表示とパネル',
    icon: '🖥️',
    shortcuts: [
      { id: 'zoom-all', name: '画面全体にズーム', mac: 'Shift + 1', windows: 'Shift + 1' },
      { id: 'zoom-selection', name: '選択範囲にズーム', mac: 'Shift + 2', windows: 'Shift + 2' },
      { id: 'zoom-100', name: '画面中央に100%ズーム', mac: '⌘ + 0', windows: 'Ctrl + 0' },
      { id: 'zoom-in', name: 'ズームイン', mac: '+', windows: '+' },
      { id: 'zoom-out', name: 'ズームアウト', mac: '-', windows: '-' },
      { id: 'pan', name: '画面のパン（移動）', mac: 'Shift + ドラッグ', windows: 'Shift + ドラッグ' },
      { id: 'zoom-frame', name: '次のフレームを選択', mac: 'N', windows: 'N' },
      { id: 'prev-frame', name: '前のフレームに移動', mac: 'Shift + N', windows: 'Shift + N' },
      { id: 'page-navigation-down', name: '次のページへ移動', mac: 'fn + 上下矢印', windows: 'Page Up/Down' },
      { id: 'toggle-ruler', name: '定規の表示/非表示', mac: '⇧ + R', windows: 'Shift + R' },
      { id: 'toggle-grid', name: 'レイアウトグリッド表示', mac: '⇧ + G', windows: 'Shift + G' },
      { id: 'pixel-grid', name: 'ピクセルグリッド表示', mac: 'Shift + ¥', windows: 'Shift + \\' },
      { id: 'outline-view', name: 'アウトライン表示', mac: '⌘ + Y', windows: 'Ctrl + Y' },
      { id: 'pixel-preview', name: 'ピクセルプレビュー', mac: '⇧ + ⌘ + P', windows: 'Shift + Ctrl + P' },
      { id: 'toggle-ui', name: 'UIパネルの表示/非表示', mac: '@', windows: '@' },
      { id: 'layer-panel', name: 'レイヤーパネル表示', mac: '⌥ + 1', windows: 'Alt + 1' },
      { id: 'assets-panel', name: 'アセットパネル表示', mac: '⌥ + 2', windows: 'Alt + 2' },
      { id: 'team-library', name: 'チームライブラリ表示', mac: '⌥ + 3', windows: 'Alt + 3' },
      { id: 'design-panel', name: 'デザインパネル表示', mac: '⌥ + 8 (⇧ + E)', windows: 'Alt + 8 (Shift + E)' },
      { id: 'prototype-panel', name: 'プロトタイプパネル表示', mac: '⌥ + 9 (⇧ + E)', windows: 'Alt + 9 (Shift + E)' },
    ],
  },
];

interface ShortcutChecklistProps {
  checkedItems: Set<string>;
  onToggle: (id: string) => void;
  onTotalItemsChange: (total: number) => void;
}

export function ShortcutChecklist({ checkedItems, onToggle, onTotalItemsChange }: ShortcutChecklistProps) {
  useEffect(() => {
    const total = categories.reduce((sum, category) => sum + category.shortcuts.length, 0);
    onTotalItemsChange(total);
  }, [onTotalItemsChange]);

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <ShortcutCategory
          key={category.title}
          category={category}
          checkedItems={checkedItems}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}