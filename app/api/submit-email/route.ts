import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        const db = (await client.connect()).db('database');
        const collection = db.collection('emails');
        const response = await collection.insertOne({ email, date: new Date() });
        if (!response.acknowledged) throw new Error('Failed to submit email');
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ success: false, error });
    }
}