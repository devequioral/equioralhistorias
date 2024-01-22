import { Children, isValidElement, useState } from 'react';
import styles from '@/styles/SideBarItemMenu.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SideBarItemMenu({
  path,
  icon,
  label,
  children,
  clickEvent,
  showLabel,
  theme,
  onToggleItem,
}) {
  const [expanded, setExpanded] = useState(false);
  const collapsable = children ? true : false;
  const router = useRouter();
  const onClickMenu = (elem) => {
    const path = elem.target.dataset.path;
    if (elem.target.classList.contains(styles.collapsable)) return;
    router.push(path);
  };
  const onToggleMenu = (elem) => {
    onToggleItem && onToggleItem(elem);
    if (!elem.target.classList.contains(styles.collapsable)) return;
    setExpanded(!expanded);
  };
  const RenderChildrens = (children) => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        return <child.type {...child.props} onClick={onClickMenu} />;
      }
      return child;
    });
  };
  return (
    <div className={`${styles.itemMenu} ${styles[theme]}`}>
      <div
        className={`${styles.itemMenuCnt} ${
          collapsable === true ? styles.collapsable : ''
        }`}
        data-path={path}
        onClick={
          collapsable === true
            ? onToggleMenu
            : clickEvent
            ? clickEvent
            : onClickMenu
        }
      >
        <div className={`${styles.icon}`}>
          <Image
            src={icon.src}
            alt=""
            width={icon.width}
            height={icon.height}
          />
        </div>

        <div className={`${styles.label} ${!showLabel && styles.hide}`}>
          <span>{label} </span>
          {collapsable && !expanded && (
            <div className={`${styles.icon}`}>
              <Image
                src={`/assets/images/theme-${theme}/icon-expand.svg`}
                alt=""
                width={24}
                height={24}
              />
            </div>
          )}
          {collapsable && expanded && (
            <div className={`${styles.icon}`}>
              <Image
                src={`/assets/images/theme-${theme}/icon-collapse.svg`}
                alt=""
                width={24}
                height={24}
              />
            </div>
          )}
        </div>
      </div>
      {expanded && (
        <div className={`${styles.subMenu}`}>
          <ul className={`${styles.list}`}>{RenderChildrens(children)}</ul>
        </div>
      )}
    </div>
  );
}
