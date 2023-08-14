import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

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

const ThreadCard = ({
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
                    <p className='mt-3 text-small-regular text-light-2'>{content}</p>

                    <div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}>
                        <div className='flex gap-3.5'>
                            <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} 
                                    className='cursor-pointer object-contain'/>
                            <Link href={`/thread/${id}`}>
                                <Image src="/assets/reply.svg" alt="reply" width={24} height={24} 
                                    className='cursor-pointer object-contain'/>
                            </Link>
                            <Image src="/assets/repost.svg" alt="repost" width={24} height={24} 
                                className='cursor-pointer object-contain'/>
                            <Image src="/assets/share.svg" alt="share" width={24} height={24} 
                                className='cursor-pointer object-contain'/>
                        </div>

                        {isComment && comments.length > 0 && (
                            <Link href={`/thread/${id}`}>
                                <p className="mt-1 text-subtle-medium text-gray-1">
                                    {comments.length} replies
                                </p>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </div>

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
        )

        }

    </article>
  )
}

export default ThreadCard;