"use client"
import { useCurrentUser } from '@/hooks/use-current-user';
import React, { ReactNode } from 'react'


type LayoutProps = {
  children: ReactNode;
};


const Authlayout =({ children }: LayoutProps) => {
    const {user} = useCurrentUser(
    )
    console.log(user);
    
  return (
    <div>
        {children}
    </div>
  )
}

export default Authlayout