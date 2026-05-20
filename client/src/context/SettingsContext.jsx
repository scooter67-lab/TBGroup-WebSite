import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { defaultPages } from '../data/defaultPages';
import { deepMerge } from '../utils/deepMerge';

const SettingsContext = createContext({
  settings: {},
  pages: defaultPages,
  banners: [],
  loading: true,
  getBanner: () => null,
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/settings/public')
      .then(({ data }) => {
        setSettings({
          ...data,
          pages: deepMerge(defaultPages, data.pages || {}),
        });
      })
      .catch(() => setSettings({ pages: defaultPages }))
      .finally(() => setLoading(false));
  }, []);

  const pages = settings.pages || defaultPages;
  const banners = settings.banners || [];
  const getBanner = (placement) => banners.find((b) => b.placement === placement) ?? null;

  return (
    <SettingsContext.Provider value={{ settings, pages, banners, loading, getBanner }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
