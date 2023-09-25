import type { FC } from 'react';
import React from 'react';

import { App } from '../components/App';
import {Section} from "@jerry-serverless/jerry-ui/lib/Section";

export const HomePageRoute: FC = () => {
  return (
    <App>
      <Section>Test section</Section>
      <Section>Test section 2</Section>
    </App>
  );
};

export const getStaticProps = () => ({props:{}});

export default HomePageRoute;
