"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignOutButton, OrganizationSwitcher, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const Topbar = () => {

  const router = useRouter();
  const { userId } = useAuth();

  return (
    <nav className='topbar'>
      <Link href="/" className='flex items-center gap-4'>

        <Image 
          src="/assets/logo.svg"
          alt="logo"
          width={28}
          height={28}
        />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>
          Threads
        </p>

      </Link>


      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
          {!userId && (
            <div 
              className='w-full flex justify-center items-center'
              onClick={() => router.push("/sign-in")}>
              <Button className='bg-primary-500 rounded-md'>
                Sign In
              </Button>
            </div>
           )}

        </div>


        <OrganizationSwitcher appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4"
            }
          }} 
        />

      </div>


    </nav>
  )
}

export default Topbar