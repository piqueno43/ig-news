import { render, screen} from '@testing-library/react';
import {  mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client'

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';
import { useRouter } from 'next/router';

jest.mock('next-auth/client');
jest.mock('next/router')
jest.mock('../../services/prismic');

const post = {
  slug: 'my-new-post', 
  title: 'My New Post', 
  content: '<p>Post excerpt</p>', 
  updatedAt: '7 de Dezembro'
}

describe('PostPreview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false]);
    
    render(<PostPreview post={post}/>)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  });

  it ('redirects user if no subscription is found', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([{
      activeSubscription: 'fake-active-subscription',
    }, false]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<PostPreview post={post}/>)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')    
  })  

  it('loads initial data', async () => {    
    const getPrismicClientMocked = mocked(getPrismicClient);
    
    getPrismicClientMocked.mockReturnValueOnce({
        getByUID: jest.fn().mockResolvedValueOnce({
          data: {
            title: [{ type: 'heading', text: 'My New Post' }],
            content: [{ type: 'paragraph', text: 'Post excerpt' }],
            updated_at: '7 de Dezembro',
          },
          last_publication_date: '12-07-2021',
        }),
      } as any);   

    const response = await getStaticProps({
      params: { slug: 'my-new-post'},          
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post excerpt</p>',
            updatedAt: '07 de dezembro de 2021',
          }
        }
      })
    )

  })
})