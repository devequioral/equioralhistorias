import React from 'react';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import styles from '@/styles/MainNavigation.module.css';

const ChevronDownIcon = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill="currentColor"
    />
  </svg>
);

export default function MainNavigation() {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState('');
  const onClickMenu = (path) => {
    router.push(path);
  };

  const onSelectOption = (option) => {
    setSelectedOption(option);
    if (option.has('new-order')) return onClickMenu('/dashboard/orders/new');
    if (option.has('list-orders')) return onClickMenu('/dashboard/orders');
    if (option.has('list-products')) return onClickMenu('/dashboard/products');
    if (option.has('list-addons'))
      return onClickMenu('/dashboard/products/addons');
  };

  return (
    <div className={`${styles.MainNavigation}`}>
      <Button
        color="default"
        variant="light"
        className="btn-menu"
        onClick={() => onClickMenu('/dashboard')}
        startContent={
          <Image
            src={`/assets/images/theme-light/icon-home.svg`}
            width={24}
            height={24}
            alt="Inicio"
          />
        }
      >
        Inicio
      </Button>
      <ButtonGroup variant="flat">
        <Button
          color="default"
          variant="light"
          className="btn-menu"
          onClick={() => onClickMenu('/dashboard/orders')}
          startContent={
            <Image
              src={`/assets/images/theme-light/icon-orders.svg`}
              width={24}
              height={24}
              alt="Cotizaciones"
            />
          }
        >
          Cotizaciones
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Opciones de Cotizaciones"
            selectedKeys={selectedOption}
            selectionMode="single"
            onSelectionChange={onSelectOption}
            className="max-w-[300px]"
          >
            <DropdownItem
              key="new-order"
              description={`Crear nueva Cotización`}
            >
              Nueva
            </DropdownItem>
            <DropdownItem
              key="list-orders"
              description={`Ver mis Cotizaciones`}
            >
              Todas
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
      {user && user?.role === 'admin' && (
        <ButtonGroup variant="flat">
          <Button
            color="default"
            variant="light"
            className="btn-menu"
            onClick={() => onClickMenu('/dashboard/products')}
            startContent={
              <Image
                src={`/assets/images/theme-light/icon-products.svg`}
                width={24}
                height={24}
                alt="Inventario"
              />
            }
          >
            Inventario
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Opciones de Inventario"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={onSelectOption}
              className="max-w-[300px]"
            >
              <DropdownItem
                key="list-products"
                description={`Listado de Productos`}
              >
                Productos
              </DropdownItem>
              <DropdownItem
                key="list-addons"
                description={`Listado de Adicionales`}
              >
                Adicionales
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      )}
      {user && user?.role === 'admin' && (
        <Button
          color="default"
          variant="light"
          className="btn-menu"
          onClick={() => onClickMenu('/dashboard/users')}
          startContent={
            <Image
              src={`/assets/images/theme-light/icon-user.svg`}
              width={24}
              height={24}
              alt="Usuarios"
            />
          }
        >
          Usuarios
        </Button>
      )}
      {user && user?.role === 'admin' && (
        <Button
          color="default"
          variant="light"
          className="btn-menu"
          onClick={() => onClickMenu('/dashboard/tickets')}
          startContent={
            <Image
              src={`/assets/images/theme-light/icon-tickets.svg`}
              width={24}
              height={24}
              alt="Tickets"
            />
          }
        >
          Tickets
        </Button>
      )}
      <Button
        color="default"
        variant="light"
        className="btn-menu"
        onClick={() => onClickMenu('/close-session')}
        startContent={
          <Image
            src={`/assets/images/theme-light/icon-exit.svg`}
            width={24}
            height={24}
            alt="menu"
          />
        }
      >
        Salir
      </Button>
    </div>
  );
}
