import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

function VisuallyHidden({
  as: Element = 'span',
  className,
  children,
  ...delegated
}) {
  return (
    <Element
      className={styles.wrapper}
      {...delegated}
    >
      {children}
    </Element>
  );
}

export default VisuallyHidden;