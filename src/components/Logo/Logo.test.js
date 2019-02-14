import React from 'react'
import renderer from 'react-test-renderer'

import { Logo } from './Logo'

describe('<Logo />', () => {
  const defaultProps = {
    image: 'http://star-wars.com/image.jpg',
    className: ''
  }
  const wrapper = renderer.create(<Logo {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
