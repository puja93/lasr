import { useState, useEffect } from 'react';
import { THEME_STORAGE_KEY, THEME_MEDIA_QUERY } from '@/lib/utils';

type ThemeMode = 'dark' | 'light' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const storedTheme = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) ?? 'system';
    setThemeState(storedTheme);

    const updateResolvedTheme = () => {
      if (storedTheme === 'system') {
        const isDark = window.matchMedia(THEME_MEDIA_QUERY).matches;
        setResolvedTheme(isDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(storedTheme);
      }
    };

    updateResolvedTheme();

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateResolvedTheme);
    };
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    const doc = document.documentElement;
    doc.classList.remove('dark', 'light');

    if (newTheme === 'system') {
      const isDark = window.matchMedia(THEME_MEDIA_QUERY).matches;
      doc.classList.add(isDark ? 'dark' : 'light');
      setResolvedTheme(isDark ? 'dark' : 'light');
    } else {
      doc.classList.add(newTheme);
      setResolvedTheme(newTheme);
    }
  };

  return { theme: resolvedTheme, setTheme };
}
