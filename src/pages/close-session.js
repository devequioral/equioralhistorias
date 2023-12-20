import React, { useEffect } from 'react';
import Metaheader from '@/components/Metaheader';
import { signOut, useSession } from 'next-auth/react';

export default function CloseSessionScreen() {
  const ref = React.useRef(null);
  useEffect(() => {
    if (ref.current === true) return;
    ref.current = true;
    signOut({ callbackUrl: '/login' });
  }, []);
  return (
    <>
      <Metaheader />
    </>
  );
}
