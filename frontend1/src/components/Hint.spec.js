import React from 'react'
import { render } from '@testing-library/react'
import Hint from './Hint'

describe('<Hint>', () => {
    it('Renders the expected Hint', () => {
    const expectedHint = 12345678
    const { getByText } = render(<Hint hint={expectedHint} />)
    expect(getByText(expectedHint)).toBeInTheDocument()
    })
});