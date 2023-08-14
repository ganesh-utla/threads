"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface updateUserParams {
    userId: string,
    username: string,
    name: string,
    image: string,
    pathname: string,
    bio: string
}

export async function updateUser ({
    userId,
    username,
    name,
    image,
    pathname,
    bio
} : updateUserParams ) : Promise<void> {

    try {
        await connectToDB();
    
        await User.findOneAndUpdate(
            { id: userId },
            { 
                username: username.toLowerCase(),
                name,
                image,
                bio,
                onboarded: true
            },
            { upsert: true }
        )
    
        if (pathname==="/profile/edit") {
            revalidatePath(pathname);
        }
    }

    catch (error: any) {
        throw new Error("Failed to create/update user:", error.message);
    }


}

export async function fetchUser (userId: string) {
    try {
        await connectToDB();

        const user = await User.findOne({ id: userId });

        return user;
    }

    catch (error: any) {
        throw new Error("Failed to fetch user:", error.message);
    }
}


export async function fetchUserThreads (userId: string) {
    try {
        await connectToDB();

        const user = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "name image id"
                    }
                }
            });

        return user;
    }

    catch (error: any) {
        throw new Error("Failed to fetch threads:", error.message);
    }
}


export async function fetchUsers ({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
} : {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder
}) {
    try {
        await connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            id: { $ne: userId }
        }

        if(searchString.trim() !== "") {
            query.$or = [
                { username: {$regex : regex }},
                { name: {$regex: regex }}
            ]
        }

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);

        const users = await usersQuery.exec();

        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };

    }

    catch (error: any) {
        throw new Error("Failed to fetch users:", error.message);
    }
}


export async function getActivity (userId: string) {
    try {
        await connectToDB();

        const userThreads = await Thread.find({ author: userId });

        const childThreadIds = await userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children);
        }, []);

        const replies = await Thread.find({
            _id: { $in: childThreadIds }, 
            author: {$ne: userId},
        }).populate({
            path: 'author',
            model: User,
            select: 'name _id image'
        });

        return replies;
    }

    catch (error: any) {
        throw new Error("Failed to fetch Activity:", error.message);
    }
}