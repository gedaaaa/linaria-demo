import { css } from 'styled-components';
import { styled } from '@linaria/react';

import { tm } from '../themes';

// used to use styled components, keep it at this migration
const sharedCss = css`
  width: 64px;
  height: 64px;
  margin: 8px;
  padding: 8px;
`

export const Section = styled.div`
  background-color: ${tm((theme) => theme.color.GrayscaleOffBlack)};
  ${sharedCss.toString()}
`;
