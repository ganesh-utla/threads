import { ProfileHeader, ThreadsTab } from '@/components/shared';
import { currentUser } from '@clerk/nextjs';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from '@/constants';
import Image from 'next/image';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import { UserCard } from '@/components/card';

const Page = async ({ params } : { params: {id: string} }) => {
  
  const user = await currentUser();

  if (!user) return null;
  
  const communityInfo = await fetchCommunityDetails(params.id);

  if (!communityInfo) return null;

  return (
    <section>
        <ProfileHeader
            accountId={communityInfo._id}
            authUserId={user.id}
            name={communityInfo.name}
            username={communityInfo.username}
            imgUrl={communityInfo.image}
            bio={communityInfo.bio}
            type="community"
        />

        <div className='mt-9'>
            <Tabs defaultValue='threads' className='w-full'>
                <TabsList className='tab'>
                    {communityTabs.map((item) => (
                        <TabsTrigger
                            key={item.label}
                            value={item.value}
                            className='tab'
                        >
                            <Image 
                                src={item.icon}
                                alt={item.label}
                                width={24}
                                height={24}
                            />
                            <p className='max-sm:hidden'>
                                {item.label}
                            </p>

                            {item.label==="Threads" && (
                                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-light-2 !text-tiny-medium">
                                    {communityInfo?.threads?.length}
                                </p>
                            )}

                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="threads" className='w-full text-light-1'>
                    <ThreadsTab 
                        currentUserId={user.id}
                        accountId={communityInfo._id}
                        accountType="Community"
                    />
                </TabsContent>

                <TabsContent value="members" className='w-full text-light-1'>
                    <section className='mt-9 flex flex-col gap-10'>
                        {communityInfo?.members.map((member: any) => (
                            <UserCard
                                key={member.id}
                                id={member.id}
                                name={member.name}
                                username={member.username}
                                imgUrl={member.image}
                                personType='User'
                            />
                        ))}
                    </section>
                </TabsContent>

                <TabsContent value="requests" className='w-full text-light-1'>
                    <ThreadsTab 
                        currentUserId={user.id}
                        accountId={communityInfo._id}
                        accountType="Community"
                    />
                </TabsContent>

            </Tabs>
        </div>
    </section>
  )
}

export default Page