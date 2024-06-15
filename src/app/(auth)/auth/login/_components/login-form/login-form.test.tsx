import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import {
  FormStatusNotPending,
  FormStatusPending,
  useFormStatus,
} from 'react-dom'

import { LoginForm } from './login-form'

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: jest.fn().mockReturnValue([{ errors: [] }, 'action']),
  useFormStatus: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}))

const FORM_STATUS_NOT_PENDING: FormStatusNotPending = {
  pending: false,
  data: null,
  method: null,
  action: null,
}
const FORM_STATUS_PENDING: FormStatusPending = {
  pending: true,
  data: new FormData(),
  method: 'POST',
  action: 'action',
}

describe('login form component', () => {
  it('should display email and password fields', async () => {
    jest.mocked(useFormStatus).mockReturnValue(FORM_STATUS_NOT_PENDING)
    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email address')
    expect(emailInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toBeInTheDocument()
  })

  it('should display spinner when form status is pending', async () => {
    jest.mocked(useFormStatus).mockReturnValue(FORM_STATUS_PENDING)
    render(<LoginForm />)

    const spinner = screen.getByRole('status')
    const submitBtn = screen.queryByRole('button')

    expect(spinner).toBeInTheDocument()
    expect(submitBtn).not.toBeInTheDocument()
  })
})
