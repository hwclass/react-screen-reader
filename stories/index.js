// Libraries
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

// Components
import ScreenReader from '../src/';

storiesOf('ScreenReader', module)
  .add('default', () => (
    <ScreenReader/>
  ))
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  ));
