import { ThreadCard } from "@/components/card";
import { Pagination } from "@/components/shared";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

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

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  )
}