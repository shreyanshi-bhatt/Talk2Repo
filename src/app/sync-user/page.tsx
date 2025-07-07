import { auth, clerkClient } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { db } from '@/server/db';
import { id } from 'date-fns/locale';

const SyncUser = async () => {
    const { userId } = await auth();
    if (!userId) {
        return <div>Please sign in to sync your user data.</div>;
    }
    
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    if(!user.emailAddresses[0]?.emailAddress) return notFound();

    await db.user.upsert({
        where: {
            emailAddress: user.emailAddresses[0]?.emailAddress ?? ""
        },
        update: {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            imageUrl: user.imageUrl ?? "",
        },
        create: {
            id: user.id,
            emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            imageUrl: user.imageUrl ?? "",
        }
    })
    return redirect('/dashboard');
}

export default SyncUser;