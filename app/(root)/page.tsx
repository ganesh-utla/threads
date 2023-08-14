import { ThreadCard } from "@/components/card";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";


export default async function Home() {

  const result = await fetchPosts(1, 20);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length==0? (
          <p className="no-result">No Threads Found...</p>
        ) : (
          <>
            {result.posts.map(post => (
              <ThreadCard
                key={post.id}
                id={post._id}
                currentUserId={user?.id || ""}
                content={post.text}
                author={post.author}
                parentId={post.parentId}
                comments={post.children}
                community={post.community}
                createdAt={post.createdAt}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}