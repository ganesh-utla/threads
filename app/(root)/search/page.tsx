
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UserCard } from '@/components/card';
import { Input } from '@/components/ui/input';

const Page = async () => {
  
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 20
  });

  return (
    <section>
        <h2 className='head-text mb-10'>Search</h2>

        <div className='searchbar'>
            <Input
                type="text"
                className='searchbar_input'
            />

        </div>

        <div className='mt-14 flex flex-col gap-9'>
            {result.users.length === 0? (
                <p className='no-result'>No users found..</p>
            ) : (
                <>
                    {result.users.map(user => (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            imgUrl={user.image}
                            personType="User"
                        />
                    ))}
                </>
            )}
        </div>

    </section>
  )
}

export default Page