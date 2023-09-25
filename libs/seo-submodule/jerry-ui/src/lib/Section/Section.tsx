import React, {forwardRef, PropsWithChildren} from 'react';

import * as S from './styled.Section';

/**
 *
 * Section
 *
 * Used to control vertical padding, backgroundColor and border color of sections
 * Use with Container
 *
 */

const forwardRefSection = forwardRef<HTMLDivElement, PropsWithChildren<{}>>((props, ref) => {
  const { children } = props;

  return (
    <S.Section>
      <div ref={ref}>
          {children}
      </div>
    </S.Section>
  );
});

export const Section = React.memo(forwardRefSection);
