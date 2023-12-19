import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <>
      <Metaheader />
      <Layout theme={theme} toogleTheme={toggleTheme}></Layout>
    </>
  );
}
