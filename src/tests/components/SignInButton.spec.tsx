import { render, screen } from '@testing-library/react';
import {  mocked } from 'ts-jest/utils';
import { SignInButton } from '../../components/SignInButton';
import { useSession } from 'next-auth/client'

jest.mock('next-auth/client')

describe('SignInButton component', () => {
  it('renders correctly when use is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue([null, false]);

    render( 
      <SignInButton />
    )   
    expect(screen.getByText('Sign In with Github')).toBeInTheDocument()    
  })
  it('renders correctly when use is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john.doe@excample.com'        
      },
      expires: 'fake-expires'        
    }, true]);

    render( 
      <SignInButton />
    )   
    expect(screen.getByText('John Doe')).toBeInTheDocument()    
  })
})