import { fetchCommunities } from '@/lib/actions/community.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'
import SuggestedCard from '../card/SuggestedCard';
import { fetchUsers } from '@/lib/actions/user.actions';

const RightSidebar = async () => {

  const user = await currentUser();

  if (!user) return null;

  const { communities } = await fetchCommunities({ pageSize: 4 });
  const { users } = await fetchUsers({ userId: user.id, pageSize: 4 });

  return (
    <section className='custom-scrollbar rightsidebar'>
      
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Communities
        </h3>
        <div className='flex flex-1 flex-col justify-start'>
          {communities.map((community: any) => (
            <SuggestedCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              isUser={false}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Users
        </h3>
        <div className='flex flex-1 flex-col justify-start'>
            {users.map((user: any) => (
              <SuggestedCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                isUser={true}
              />
            ))}
          </div>
      </div>

    </section>
  )
}

export default RightSidebar;