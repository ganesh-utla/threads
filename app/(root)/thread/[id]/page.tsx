import { ThreadCard } from '@/components/card';
import { Comment } from '@/components/forms';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { Children } from 'react'

const Page = async ({ params } : { params : { id: string } }) => {

  if(!params.id) return null;

  const user = await currentUser();
  if(!user) return null;
  
  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className='relative'>
      <div>
        <ThreadCard 
          id={thread._id}
          currentUserId={user.id}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          content={thread.text}
          parentId={thread.parentId}
          comments={thread.children}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={thread.id}
          currentUserId={JSON.stringify(userInfo._id)}
          currentUserImg={userInfo.image} 
        />
      </div>

      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <ThreadCard 
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            content={childItem.text}
            parentId={childItem.parentId}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>

    </section>
  )
}

export default Page;