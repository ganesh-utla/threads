
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { fetchCommunities } from '@/lib/actions/community.actions';
import CommunityCard from '@/components/card/CommunityCard';
import Image from 'next/image';

const Page = async () => {
  
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: '',
    pageNumber: 1,
    pageSize: 20
  });

  return (
    <section>
        <h2 className='head-text mb-10'>Communities</h2>

        <div className='searchbar'>
            <Image
              src="/assets/search-gray.svg"
              alt="search"
              width={24}
              height={24}
              className="rounded-full object-contain"
            />
            <Input
                type="text"
                className='searchbar_input no-focus'
                placeholder='Search communities'
            />
        </div>

        <div className='mt-14 flex flex-col gap-9'>
            {result.communities.length === 0? (
                <p className='no-result'>No communities found..</p>
            ) : (
                <>
                    {result.communities.map(community => (
                        <CommunityCard
                          key={community.id}
                          id={community.id}
                          name={community.name}
                          username={community.username}
                          imgUrl={community.image}
                          bio={community.bio}
                          members={community.members}
                        />
                    ))}
                </>
            )}
        </div>

    </section>
  )
}

export default Page