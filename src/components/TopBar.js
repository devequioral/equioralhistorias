import React from 'react';
import styles from '@/styles/TopBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function TopBar(props) {
  const { data: session } = useSession();
  const user = session?.user;
  const { theme, onClickEvent, toogleTheme } = props;
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = React.useState(
    props.sidebarExpanded
  );

  const onClickMenu = (ev) => {
    onClickEvent(ev);
    if (ev === 'toggle-sidebar') setSidebarExpanded(!sidebarExpanded);
  };

  const searchInput = React.useRef(null);
  const onSearch = () => {
    const search = searchInput.current.value;
    console.log(search);
  };
  const _toggleTheme = () => {
    toogleTheme();
  };
  const getUserName = () => {
    if (!user) return 'Invitado';
    let name = user.name || user.username;
    if (name.indexOf(' ') > -1) {
      name = name.split(' ');
      name = name[0];
    }
    return name;
  };
  return (
    <>
      <div
        className={`${styles.TopBar} ${
          !sidebarExpanded && styles.lessPadding
        } ${styles[theme]}`}
      >
        <div className={`container-full ${styles.container}`}>
          <div className={`row ${styles.row}`}>
            <div className={`col-4 ${styles.colLeft}`}>
              <div
                className={`${styles.hamburguer}`}
                onClick={() => onClickMenu('toggle-sidebar')}
              >
                <Image
                  src={`/assets/images/theme-${theme}/hamburguer.svg`}
                  width={50}
                  height={36}
                  alt="Menu"
                />
              </div>
              <div className={`hide-xs hide-sm ${styles.logo}`}>
                <Link href="/">
                  <Image
                    src={`/assets/images/theme-${theme}/logo.svg`}
                    width={141}
                    height={33}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className={`col-4 ${styles.colCenter}`}>
              {/* <input
                className={`${styles.search}`}
                type="text"
                placeholder="Buscar"
                ref={searchInput}
                onKeyDown={(ev) => {
                  //IF KEY ENTER IS PRESSED
                  if (ev.key === 'Enter') {
                    onSearch();
                  }
                }}
              />
              <div className={`hide-xs hide-sm ${styles.cntBtn}`}>
                <div className={`${styles.icon}`} onClick={onSearch}>
                  <Image
                    src={`/assets/images/theme-${theme}/icon-search.svg`}
                    width={18}
                    height={18}
                    alt="Search Icon"
                  />
                </div>
                <div className={`hide-xs ${styles.icon} ${styles.iconLabel}`}>
                  <div onClick={onSearch}>Buscar</div>
                </div>
              </div> */}
            </div>
            <div className={`col-4 ${styles.colRight}`}>
              {/* <div className={`${styles.cntBtn}`}>
                <div className={`${styles.icon}`} onClick={_toggleTheme}>
                  <Image
                    src={`/assets/images/theme-${theme}/icon-theme.svg`}
                    width={24}
                    height={24}
                    alt="Theme"
                  />
                </div>
              </div> */}

              <div className={`${styles.cntBtn}`}>
                <div className={`${styles.icon}`}>
                  <Link href="/app">
                    <Image
                      src={`/assets/images/theme-${theme}/icon-notification.svg`}
                      width={24}
                      height={24}
                      alt="Notification"
                    />
                  </Link>
                </div>
              </div>

              <div className={`${styles.cntBtn}`}>
                <div className={`${styles.icon}`}>
                  <Link href="/app">
                    <Image
                      src={`/assets/images/theme-${theme}/icon-user.svg`}
                      width={24}
                      height={24}
                      alt="User Icon"
                    />
                  </Link>
                </div>
                <div className={`hide-xs ${styles.icon} ${styles.iconLabel}`}>
                  <Link href="/app" className={`${styles.Username}`}>
                    {getUserName()}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
