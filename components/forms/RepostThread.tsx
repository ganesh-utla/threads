"use client";

import { PostThread } from '.';
import Image from 'next/image';
import React, { useState } from 'react'

const RepostThread = ({
    userId,
    postContent
} : {
    userId: string,
    postContent: string
}) => {

    const [repost, setRepost] = useState(false);

  return (
    <div>
        <Image src="/assets/repost.svg" alt="repost" width={24} height={24} 
            className='cursor-pointer object-contain'
            onClick={() => setRepost(true)}
        />
        
        { repost && 
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                <div className="relative my-6 mx-auto w-[800px] max-w-3xl ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                        <div className='p-5'>
                            <div className='flex justify-end pb-2'>
                                <p className='w-min text-light-3 text-base-regular hover:underline cursor-pointer' 
                                    onClick={() => setRepost(false)}
                                >
                                    Close
                                </p>
                            </div>
                            <h1 className='head-text'>Repost Thread</h1>
                            <div className='mt-10'>
                                <PostThread userId={`${userId}`} postContent={postContent} setShowModal={setRepost} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}


export default RepostThread;