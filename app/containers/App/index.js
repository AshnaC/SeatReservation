/**
 *
 * App.js
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import FundContainer from '../FundContainer';
import background from '../../images/dark.jpg';

const AppWrapper = styled.div`
  min-width: 800px;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-image: url(${background});
  background-size: 100% 100%;
`;

export default function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="*" component={FundContainer} />
      </Switch>
    </AppWrapper>
  );
}
