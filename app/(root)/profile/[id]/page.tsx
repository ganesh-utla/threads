import { ProfileHeader, ThreadsTab } from '@/components/shared';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from '@/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const Page = async ({ params } : { params: {id: string} }) => {
  
  const user = await currentUser();

  if (!user) return null;
  
  const userInfo = await fetchUser(params.id);

  if (!userInfo) return null;

  return (
    <section>
        <ProfileHeader
            accountId={userInfo._id}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
        />

        <div className='mt-9'>
            <Tabs defaultValue='threads' className='w-full'>
                <TabsList className='tab'>
                    {profileTabs.map((item) => (
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
                                    {userInfo?.threads?.length}
                                </p>
                            )}

                        </TabsTrigger>
                    ))}
                </TabsList>
                {profileTabs.map((tab) => (
                    <TabsContent key={`content-${tab.label}`} value={tab.value} className='w-full text-light-1'>
                        <ThreadsTab 
                            currentUserId={user.id}
                            accountId={userInfo.id}
                            accountType="User"
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    </section>
  )
}

export default Page