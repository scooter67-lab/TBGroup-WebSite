import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { defaultPages } from '../data/defaultPages';
import { deepMerge } from '../utils/deepMerge';

// Фолбэк-контакты: показываются, пока/если API недоступен (данные админки их перекрывают)
const defaultContacts = {
  phone: '+7 (708) 800-49-49',
  email: 'yedilturekulov@gmail.com',
  address: 'г. Алматы, ул. Рыскулова, 140/4, оф. 201',
};

const SettingsContext = createContext({
  settings: { contacts: defaultContacts },
  pages: defaultPages,
  banners: [],
  loading: true,
  getBanner: () => null,
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ contacts: defaultContacts });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/settings/public')
      .then(({ data }) => {
        setSettings({
          ...data,
          contacts: { ...defaultContacts, ...(data.contacts || {}) },
          pages: deepMerge(defaultPages, data.pages || {}),
        });
      })
      .catch(() => setSettings({ contacts: defaultContacts, pages: defaultPages }))
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
