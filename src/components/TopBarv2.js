import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import MainNavigation from '@/components/MainNavigation';
import styles from '@/styles/TopBarV2.module.css';

export default function ToBarv2() {
  const { data: session } = useSession();
  const user = session?.user;
  const getUserName = () => {
    if (!user) return 'Invitado';
    let name = user.name || user.username;
    if (name.indexOf(' ') > -1) {
      name = name.split(' ');
      name = name[0];
    }
    return name;
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="hide-md hide-lg hide-xl"
      />
      <NavbarBrand>
        <Link href="/">
          <Image
            src={`/assets/images/theme-light/logo.svg`}
            width={141}
            height={33}
            alt="Logo"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" justify="end" className="hide-xss">
        <NavbarItem className="lg:flex">
          <Link href="/dashboard">
            <Image
              src={`/assets/images/theme-light/icon-notification.svg`}
              width={24}
              height={24}
              alt="Notification"
            />
          </Link>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="avatar-topnav"
              name="Jason Hughes"
              size="sm"
              src="/assets/images/user-icon.svg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Bienvenido</p>
              <p className="font-semibold">{getUserName()}</p>
            </DropdownItem>
            <DropdownItem key="profile">
              <Link href="/dashboard">Perfil</Link>
            </DropdownItem>
            <DropdownItem key="orders">
              <Link href="/dashboard/orders">Mis Cotizaciones</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <Link href="/close-session">Cerrar Sesión</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        <div className={`${styles.MainNavigationCNT}`}>
          <MainNavigation />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
