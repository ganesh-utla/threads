"use client";

// import { deleteFromLikedThreads } from "@/lib/actions/user.actions";
// import { addToLikedThreads, isUserLikedThread } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  parentId: string | null;
  isComment?: boolean;
}

function LikeThread({
  threadId,
  currentUserId,
  parentId,
  isComment,
}: Props) {

    const [liked, setLiked] = useState(false);

    // const checkLikeStatus = async () => {
    //     const isLiked = await isUserLikedThread(currentUserId, JSON.parse(threadId));
    //     if (isLiked)
    //         setLiked(true);
    //     console.log(isLiked);
    // }

    // useEffect(() => {
    //     checkLikeStatus();
    // }, []);

  return (
    <Image
      src={`/assets/${liked? "heart-filled" : "heart-gray"}.svg`}
      alt='heart'
      width={24}
      height={24}
      className='cursor-pointer object-contain'
      onClick={async () => {
        console.log(liked);
        setLiked(prev => !prev);
        // if (liked) {
            // await deleteFromLikedThreads(currentUserId, JSON.parse(threadId));
        // } else {
            // await addToLikedThreads(currentUserId, threadId);
        // }
      }}
    />
  );
}

export default LikeThread;