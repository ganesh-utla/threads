import { fetchUserThreads } from "@/lib/actions/user.actions";
import { ThreadCard } from "../card";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";


interface ThreadsTabProps {
    currentUserId: string,
    accountId: string,
    accountType: string
}

const ThreadsTab = async ({ currentUserId, accountId, accountType } : ThreadsTabProps) => {

  const result = accountType==="User"? await fetchUserThreads(accountId) : await fetchCommunityPosts(accountId);

  if (!result) return null;

  return (
    <section className="mt-9 flex flex-col gap-10">
        {result.threads.map((thread: any) => (
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                author={accountType==="User"? 
                    {name: result.name, image: result.image, id: result.id}:
                    {name: thread.author.name, image: thread.author.image, id: thread.author.id}}
                community={thread.community}
                content={thread.text}
                comments={thread.children}
                parentId={thread.parentId}
                createdAt={thread.createdAt}
            />
        ))}
    </section>
  )
}

export default ThreadsTab;