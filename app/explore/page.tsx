"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, TrendingUp, Clock, Heart, Share2, MessageCircle, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("trending")
  const [filterBy, setFilterBy] = useState("all")

  const posts = [
    {
      id: 1,
      title: "This React hook will absolutely send you to the moon 🚀",
      author: { name: "CodeWizard", avatar: "/placeholder.svg", username: "@codewiz" },
      language: "JavaScript",
      likes: 1247,
      shares: 89,
      comments: 156,
      earned: "23.5 STRK",
      timeAgo: "2h ago",
      tags: ["#ReactHooks", "#WebDev", "#JavaScript"],
      preview:
        "const useAwesome = () => {\n  const [isAwesome, setAwesome] = useState(true)\n  return { isAwesome, makeMoreAwesome: () => setAwesome(prev => !prev) }\n}",
      trending: true,
    },
    {
      id: 2,
      title: "Cairo smart contract that's absolutely bussin 💎",
      author: { name: "StarkDev", avatar: "/placeholder.svg", username: "@starkdev" },
      language: "Cairo",
      likes: 892,
      shares: 67,
      comments: 94,
      earned: "18.2 STRK",
      timeAgo: "4h ago",
      tags: ["#Cairo", "#Starknet", "#SmartContracts"],
      preview:
        "#[contract]\nmod AwesomeContract {\n    #[storage]\n    struct Storage {\n        balance: felt252,\n    }\n}",
      trending: false,
    },
    {
      id: 3,
      title: "Python algorithm that hits different (no cap) 🔥",
      author: { name: "PyMaster", avatar: "/placeholder.svg", username: "@pymaster" },
      language: "Python",
      likes: 2156,
      shares: 134,
      comments: 287,
      earned: "41.7 STRK",
      timeAgo: "6h ago",
      tags: ["#Python", "#Algorithm", "#MachineLearning"],
      preview:
        "def mind_blowing_algo(data):\n    # This will make you question reality\n    result = [x**2 for x in data if x > 0]\n    return sorted(result, reverse=True)",
      trending: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Epic Code
              </span>
            </h1>
            <p className="text-xl text-gray-300">Discover the most fire code from our community 🔥</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for that perfect code snippet..."
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="trending">🔥 Trending</SelectItem>
                <SelectItem value="recent">⏰ Recent</SelectItem>
                <SelectItem value="popular">❤️ Most Liked</SelectItem>
                <SelectItem value="earnings">💰 Top Earners</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cairo">Cairo</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Author Info */}
                      <Avatar className="w-12 h-12 border-2 border-cyan-500">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                          {post.author.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-white">{post.author.name}</span>
                          <span className="text-gray-400 text-sm">{post.author.username}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.timeAgo}
                          </span>
                          {post.trending && (
                            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 cursor-pointer transition-colors">
                          {post.title}
                        </h2>

                        {/* Code Preview */}
                        <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">{post.language}</span>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              View Full Code
                            </Button>
                          </div>
                          <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                            <code>{post.preview}</code>
                          </pre>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-cyan-500/30 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Engagement Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Heart className="w-5 h-5" />
                              <span>{post.likes.toLocaleString()}</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Share2 className="w-5 h-5" />
                              <span>{post.shares}</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
                            >
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </motion.button>
                          </div>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-full border border-green-500/30">
                            <Coins className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold">{post.earned}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Load More Epic Code 🚀
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
