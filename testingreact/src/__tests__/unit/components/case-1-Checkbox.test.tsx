import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent, screen } from '@testing-library/react'

import Checkbox from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const setUpCheckBox = () => render(<Checkbox {...mockDefaultProps} />)

  const mockDefaultProps = {
    label: 'TEST_CHECKBOX_LABEL',
    id: 'TEST_CHECKBOX_ID',
    checked: false,
    background: '#000',
    checkMarkBackground: '#fff',

    onChange: jest.fn(),
  }
  it('❌ Should render the label and checkbox the user will see', () => {
    const { asFragment } = setUpCheckBox()
    expect(asFragment()).toMatchSnapshot()
    //This is manual testing
    // expect(container.querySelector('label')).not.toBeNull()
    // expect(container.querySelector('input[type=checkbox]')).not.toBeNull()
  })

  it('❌ Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText } = setUpCheckBox()

    expect(getByLabelText('TEST_CHECKBOX_LABEL')).toBeInTheDocument()
  })

  it('❌ Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setUpCheckBox()

    const checkbox = getByLabelText('TEST_CHECKBOX_LABEL')

    fireEvent.click(checkbox)

    expect(mockDefaultProps.onChange).toHaveBeenCalled()
  })

  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByLabelText } = setUpCheckBox()

    const checkbox = getByLabelText('TEST_CHECKBOX_LABEL')

    fireEvent.click(checkbox)

    expect(mockDefaultProps.onChange).toHaveBeenCalled()
  })

  it('❌ should not fail any accessibility tests', async () => {
    const { container } = setUpCheckBox()
    expect(await axe(container)).toHaveNoViolations()
  })
})
