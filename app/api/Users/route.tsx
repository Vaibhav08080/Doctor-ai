import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";

// Helper to serialize BigInt values
function serialize(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export  async function POST(req:NextRequest){
    const user = await currentUser();

    try{
        //@ts-ignore
        const users = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));
        if(users?.length ==0){
            const result = await db.insert(usersTable).values({
                name: user?.fullName || "Unknown User",
                email: user?.primaryEmailAddress?.emailAddress || "Unknown User",
                credits: 10,
            });
        }
        return NextResponse.json(serialize(users[0]))
    }
    catch(err){
        console.error("Error in POST /api/users:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}