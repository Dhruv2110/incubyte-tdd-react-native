/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {describe, expect, it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { render, fireEvent } from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.create(<App />);
});

describe('String Calculator', () => {
  it('should display the input number', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Enter string of numbers');
    const button = getByText('Calculate');

    fireEvent.changeText(input, '2');
    fireEvent.press(button);

    expect(getByText(`Sum: 2`)).toBeTruthy();
  });

  it('should calculate the sum of multiple numbers separated by commas', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Enter string of numbers');
    const button = getByText('Calculate');

    fireEvent.changeText(input, '1,2,3');
    fireEvent.press(button);

    expect(getByText('Sum: 6')).toBeTruthy();
  });

  it('should handle new lines between numbers', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Enter string of numbers');
    const button = getByText('Calculate');

    fireEvent.changeText(input, '1\n2,3');
    fireEvent.press(button);

    expect(getByText('Sum: 6')).toBeTruthy();
  });

  it('should handle custom delimiters', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Enter string of numbers');
    const button = getByText('Calculate');

    fireEvent.changeText(input, '//;\n1;2');
    fireEvent.press(button);

    expect(getByText('Sum: 3')).toBeTruthy();
  });

});