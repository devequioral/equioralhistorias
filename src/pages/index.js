import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current === true) return;
    ref.current = true;
    router.push('/dashboard');
  }, [router]);
  return <></>;
}
