
import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UserCard } from '@/components/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';

const Page = async () => {
  
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section>
        <h2 className='head-text mb-10'>Activity</h2>

        <div className='mt-10 flex flex-col gap-5'>
            {activity.length > 0? (
                <>
                    {activity.map(act => (
                        <Link key={act._id} href={`/thread/${act.parentId}`}>
                            <article className='activity-card'>
                                <Image
                                    src={act.author.image}
                                    alt="profile photo"
                                    width={20}
                                    height={20}
                                    className='rounded-full object-contain'
                                />
                                <p className='!text-small-regular text-light-1'>
                                    <span className='mr-1 text-primary-500'>
                                        {act.author.name}
                                    </span>{" "}
                                    replied to your thread
                                </p>
                            </article>
                        </Link>
                    ))}
                </>
            ) : (
                <p className='!text-base-regular text-light-3'>No activity yet</p>
            )}
        </div>
    </section>
  )
}

export default Page;