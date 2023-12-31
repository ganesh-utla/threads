
import { PostThread } from '@/components/forms';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {

  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
        <h1 className='head-text'>Create Thread</h1>
        <div className='mt-10'>
          <PostThread userId={`${userInfo._id}`} />
        </div>
    </>
  )
}

export default Page