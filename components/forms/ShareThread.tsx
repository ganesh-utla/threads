"use client";

import { PostThread } from '.';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const ShareThread = ({
    threadId,
    postContent
} : {
    threadId: string,
    postContent: string
}) => {

    const [share, setShare] = useState(false);
    const [contentCopied, setContentCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const url = `https://gthreads.vercel.app/threads/${threadId}`;
    const message = `Hey%2C%20Check%20out%20this%20thread%3A%0A${url}`;

  return (
    <div>
        <Image src="/assets/share.svg" alt="share" width={24} height={24} 
            className='cursor-pointer object-contain'
            onClick={() => setShare(true)}
        />
        
        { share && 
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
                <div className="relative my-6 mx-auto w-[800px] max-w-3xl ">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                        <div className='p-5'>
                            <div className='flex justify-end pb-2'>
                                <p className='w-min text-light-3 text-base-regular hover:underline cursor-pointer' 
                                    onClick={() => setShare(false)}
                                >
                                    Close
                                </p>
                            </div>
                            <h1 className='head-text'>Share Thread</h1>
                            <div className='mt-10'>
                                <div className='relative flex justify-between gap-1 bg-dark-2 border border-dark-4 text-light-1 p-3 rounded-md max-h-40 overflow-auto'>
                                    <div>{postContent}</div>
                                    <div className='sticky top-1 right-1 min-w-max bg-light-4 p-1 rounded-md h-min hover:bg-light-3'
                                        onClick={() => {
                                            setContentCopied(true);
                                            navigator.clipboard.writeText(postContent);
                                            setTimeout(() => setContentCopied(false), 3000);
                                        }}
                                    >
                                        <Image
                                            src={`/assets/${contentCopied? "tick" : "copy"}.svg`}
                                            alt="copy"
                                            width={17}
                                            height={17}
                                            className='cursor-pointer object-contain'
                                        />
                                    </div>
                                </div>
                                <div className='mt-3 flex w-full items-center justify-center'>
                                    <div className='border border-dark-4 w-3/12 h-0'/>
                                    <div className='text-light-4 mx-4 text-center'>
                                        <p>OR</p>
                                    </div>
                                    <div className='border border-dark-4 w-3/12 h-0'/>
                                </div>
                                <div className='mt-3 relative flex gap-5 justify-center bg-dark-2 border border-dark-4 text-light-1 p-3 rounded-md max-h-40 overflow-auto'>
                                    <div className='break-all'>{url}</div>
                                    <div className='sticky top-1 right-1 flex items-center p-2 h-min min-w-max bg-light-4 rounded-md hover:bg-light-3'
                                        onClick={() => {
                                            setLinkCopied(true);
                                            navigator.clipboard.writeText(url);
                                            setTimeout(() => setLinkCopied(false), 3000);
                                        }}
                                    >
                                        <Image
                                            src={`/assets/${linkCopied? "tick" : "link"}.svg`}
                                            alt="link"
                                            width={17}
                                            height={17}
                                            className='cursor-pointer object-contain'
                                        />
                                    </div>
                                </div>
                                <div className='mt-3 flex w-full items-center justify-center'>
                                    <div className='border border-dark-4 w-3/12 h-0'/>
                                    <div className='text-light-4 mx-4 text-center'>
                                        <p>Share via Media</p>
                                    </div>
                                    <div className='border border-dark-4 w-3/12 h-0'/>
                                </div>
                                <div className='mt-3 bg-dark-2 border border-dark-4 text-light-1 p-3 rounded-md'>
                                    <div className='flex justify-center items-center gap-5'>
                                        <Link href={`whatsapp://send?text=${message}`} target='_blank'>
                                            <Image
                                                src="/assets/whatsapp.svg" alt="share" width={40} height={40} 
                                                className='cursor-pointer object-contain bg-white rounded-md'
                                            />
                                        </Link>
                                        <Link href={`https://x.com/intent/tweet?url=${url}`} target='_blank'>
                                            <Image
                                                src="/assets/twitterx.svg" alt="share" width={40} height={40} 
                                                className='cursor-pointer object-contain bg-white rounded-md'
                                            />
                                        </Link>
                                        <Link href={`https://www.facebook.com/sharer.php?u=${url}`} target='_blank'>
                                            <Image
                                                src="/assets/facebook.svg" alt="share" width={40} height={40} 
                                                className='cursor-pointer object-contain bg-white rounded-md'
                                            />
                                        </Link>
                                        <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`} target='_blank'>
                                            <Image
                                                src="/assets/linkedin.svg" alt="share" width={40} height={40} 
                                                className='cursor-pointer object-contain bg-white rounded-lg'
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}


export default ShareThread;