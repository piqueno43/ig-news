import { render, screen, fireEvent } from '@testing-library/react';
import {  mocked } from 'ts-jest/utils';
import {  signIn, useSession } from 'next-auth/client'
import {  useRouter } from 'next/router'
import { SubscribeNowButton } from '../../components/SubscribeNowButton';

jest.mock('next-auth/client')

jest.mock('next/router')



describe('SubscribeNowButton component', () => {
  it('renders correctly', () => {    
    const useSessionMock = mocked(useSession)
    useSessionMock.mockReturnValueOnce([null,  false])

    render( 
      <SubscribeNowButton />
    )   
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()    
  })  

  it('redirects user to signIn in when not authenticated', () => {
    const useSessionMock = mocked(useSession)
    useSessionMock.mockReturnValueOnce([null,  false])

    const signInMock = mocked(signIn)

    render(<SubscribeNowButton />)
    
    const subscriptionButton = screen.getByText('Subscribe now')
    
    fireEvent.click(subscriptionButton)
    
    expect(signInMock).toHaveBeenCalled()
  })

  it('redirects to posts when user already subscribed', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)

    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john.doe@excample.com'        
      },
      activeSubscription: 'fake-subscription',
      expires: 'fake-expires'        
      }, false
    ]);
    
    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeNowButton />)

    const subscriptionButton = screen.getByText('Subscribe now')

    fireEvent.click(subscriptionButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})