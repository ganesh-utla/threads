import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { DeleteThread, LikeThread } from '../forms';
import RepostThread from '../forms/RepostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ShareThread from '../forms/ShareThread';

interface ThreadCardProps {
    id: string;
    currentUserId: string;
    author: {
        name: string,
        id: string,
        image: string
    };
    community: {
        name: string,
        id: string,
        image: string
    } | null;
    createdAt: string;
    content: string;
    parentId: string | null;
    comments: {
        author : {
            image: string
        }
    }[];
    isComment?: boolean;
}

const ThreadCard = async ({
    id,
    currentUserId,
    author,
    community,
    createdAt,
    content,
    comments,
    parentId,
    isComment
} : ThreadCardProps ) => {

    const userInfo = await fetchUser(currentUserId);

    if(!userInfo?.onboarded) redirect("/onboarding");

  return (
    <article className={`w-full flex flex-col rounded-xl ${isComment? "px-0 xs:px-7" : "bg-dark-2 p-7"}`}>
        <div className='flex item-start justify-between'>

            <div className='flex w-full flex-1 flex-row gap-4'>

                <div className='flex flex-col items-center'>
                    <Link href={`/profile/${author.id}`} className='relative w-11 h-11'>
                        <Image
                            src={author.image}
                            alt="profile photo"
                            fill
                            className='rounded-full cursor-pointer'
                        />
                    </Link>

                    <div className='thread-card_bar' />
                </div>

                <div className='flex flex-col w-full'>
                    <Link href={`/profile/${author.id}`} className='w-fit'>
                        <h4 className='cursor-pointer text-base-semibold text-light-1'>
                            {author.name}
                        </h4>
                    </Link>
                    <p className='mt-3 text-small-regular text-light-2 pr-2'>{content}</p>

                    <div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}>
                        <div className='flex gap-3.5'>
                            <LikeThread 
                                threadId={JSON.stringify(id)}
                                currentUserId={currentUserId}
                                parentId={parentId}
                                isComment={isComment}
                            />
                            <Link href={`/thread/${id}`}>
                                <Image src="/assets/reply.svg" alt="reply" width={24} height={24} 
                                    className='cursor-pointer object-contain'/>
                            </Link>

                            <RepostThread userId={`${userInfo._id}`} postContent={content} />
                            
                            <ShareThread threadId={`${id}`} postContent={content} />
                            
                        </div>

                        {isComment && comments.length > 0 && (
                            <Link href={`/thread/${id}`}>
                                <p className="mt-1 text-subtle-medium text-gray-1">
                                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                </p>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
            <DeleteThread
                threadId={JSON.stringify(id)}
                currentUserId={currentUserId}
                authorId={author.id}
                parentId={parentId}
                isComment={isComment}
            />
        </div>

        {!isComment && comments.length > 0 && (
            <div className='ml-1 mt-3 flex items-center gap-2'>
            {comments.slice(0, 2).map((comment, index) => (
                <Image
                    key={index}
                    src={comment.author.image}
                    alt={`user_${index}`}
                    width={24}
                    height={24}
                    className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                />
            ))}

            <Link href={`/thread/${id}`}>
                <p className='mt-1 text-subtle-medium text-gray-1'>
                {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                </p>
            </Link>
            </div>
        )}

        {!isComment && community && (
            <Link href={`/communities/${community.id}`} className='mt-5 flex items-center'>
                <p className='text-subtle-medium text-gray-1'>
                    {formatDateString(createdAt)} - {community.name} Community
                </p>

                <Image
                    src={community.image}
                    alt={community.name}
                    width={14}
                    height={14}
                    className='ml-1 rounded-full object-contain'
                />
            </Link>
        )}

    </article>
  )
}

export default ThreadCard;