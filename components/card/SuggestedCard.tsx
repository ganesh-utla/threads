import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  isUser: boolean;
}

function SuggestedCard({ id, name, username, imgUrl, isUser }: Props) {
  return (
    <article className='mt-5 flex gap-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <Link href={`/${isUser? "profile" : "communities"}/${id}`} className='relative h-12 w-12'>
          <Image
            src={imgUrl}
            alt='community_logo'
            fill
            className='rounded-full object-cover'
          />
        </Link>

        <div>
          <Link href={`/${isUser? "profile" : "communities"}/${id}`}>
            <h4 className='text-base-semibold text-light-1'>{name}</h4>
          </Link>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

    </article>
  );
}

export default SuggestedCard;