import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, these would come from your database
    const stats = {
      developers: 12547,
      posts: 89234,
      totalEarned: 2847392,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
