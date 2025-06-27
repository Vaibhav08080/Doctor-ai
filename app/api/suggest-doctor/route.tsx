import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/listcontentandprompt/list";
export async function POST(req:NextRequest){
    const {notes}=await req.json();
    try{
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-preview-05-20",
            messages: [
                { role: "system", content: JSON.stringify(AIDoctorAgents) },
                { role: "user", content: "User Notes/Symptons:" + notes + "Depends on user notes and symptoms , Please suggest a list of doctor, Return object in JSON only " },
            ],
        });
        const rawResp = completion.choices[0].message;
        if (!rawResp || rawResp.content == null) {
            return NextResponse.json({ error: "No content returned from OpenAI completion." }, { status: 500 });
        }
        // Remove markdown code block formatting if present
        const cleanedContent = rawResp.content.trim().replace(/^```json/, '').replace(/```$/, '');
        let jsonResp;
        try {
            jsonResp = JSON.parse(cleanedContent);
        } catch (parseErr) {
            return NextResponse.json({ error: "Failed to parse OpenAI response as JSON.", details: parseErr instanceof Error ? parseErr.message : parseErr }, { status: 500 });
        }
        return NextResponse.json(jsonResp);
    } catch (err) {
        console.error("Error in POST /api/suggest-doctor:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
