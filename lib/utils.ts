import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * クラス名を結合し、Tailwind CSSのクラスを適切にマージする
 * @param inputs - クラス名（文字列、配列、オブジェクト）
 * @returns マージされたクラス名文字列
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 指定されたIDのセクションへスムーススクロールする
 * @param id - スクロール先のセクションのID
 */
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
