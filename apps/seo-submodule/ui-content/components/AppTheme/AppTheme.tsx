import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import {
    ThemeProvider as LinariaThemeProvider,
} from '@jerry-serverless/jerry-ui/lib/themes';

const AppContainer = styled.main`
  color: ${({ theme }) => theme.color.black};
  font-family: ${({ theme }) => theme.font.circular};
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const AppTheme: FC = ({ children }) => {
    return (
        <LinariaThemeProvider>
            <AppContainer>{children}</AppContainer>
        </LinariaThemeProvider>
    );
};
