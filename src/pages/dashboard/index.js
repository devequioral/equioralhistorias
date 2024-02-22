import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import NewPatientBanner from '@/components/dashboard/NewPatientBanner';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

function DashBoardScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/patients');
  }, [router]);

  return (
    <>
      <Metaheader />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <NewPatientBanner />
      </Layout>
    </>
  );
}

DashBoardScreen.auth = true;
export default DashBoardScreen;
