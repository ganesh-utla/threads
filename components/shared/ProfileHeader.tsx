import Image from 'next/image';
import Link from 'next/link';

interface ProfileHeaderProps {
    accountId: string,
    authUserId: string,
    name: string,
    username: string,
    imgUrl: string,
    bio: string,
    type?: string
}

const ProfileHeader = ({ accountId, authUserId, name, username, imgUrl, bio, type } : ProfileHeaderProps) => {

  return (
    <div className='w-full flex flex-col justify-start'>
        <div className='flex justify-between items-start'>
            <div className='flex items-center gap-3'>
                <div className='relative w-20 h-20'>
                    <Image
                        src={imgUrl}
                        alt="profile image"
                        fill
                        className='rounded-full object-contain'
                    />
                </div>

                <div className='ml-5 flex-1'>
                    <h2 className='text-light-1 text-left text-heading3-bold'>
                        {name}
                    </h2>
                    <p className='text-base-medium text-gray-1'>
                        @{username}
                    </p>
                </div>
            </div>

            {accountId===authUserId && type!=="community" && (
                <Link href="/profile/edit">
                    <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                        <Image
                            src='/assets/edit.svg'
                            alt='logout'
                            width={16}
                            height={16}
                        />

                        <p className='text-light-2 max-sm:hidden'>Edit</p>
                    </div>
                </Link>
            )}
        </div>

        <p className='mt-6 max-w-lg text-base-regular text-light-2'>
            {bio}
        </p>

        <div className='mt-12 w-full h-0.5 bg-dark-2' />

    </div>
  )
}

export default ProfileHeader