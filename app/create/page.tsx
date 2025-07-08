"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CodeEditor from "../components/CodeEditor"
import RewardPreview from "../components/RewardPreview"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("")
  const [code, setCode] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post creation
    console.log({ title, description, language, code, tags })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Epic Content</span>
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Drop Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sickest Code
              </span>
            </h1>
            <p className="text-xl text-gray-300">Share your code, get mad engagement, earn STRK tokens! 🚀</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Create Your Post
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title (Make it catchy! 🎯)</label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., This React hook will blow your mind 🤯"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description (Tell us what's special about it)
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Explain your code, share the story behind it, or just flex 💪"
                        rows={3}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    {/* Language Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Programming Language</label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="cairo">Cairo</SelectItem>
                          <SelectItem value="rust">Rust</SelectItem>
                          <SelectItem value="solidity">Solidity</SelectItem>
                          <SelectItem value="go">Go</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Code Editor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Code (This is where the magic happens ✨)
                      </label>
                      <CodeEditor value={code} onChange={setCode} language={language} />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags (Separate with commas)
                      </label>
                      <Input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="react, hooks, web3, starknet, defi"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Post & Start Earning! 🚀
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RewardPreview />

              {/* Tips Card */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-green-100 space-y-3">
                  <p>• Use trending hashtags for max visibility 📈</p>
                  <p>• Clean, commented code gets more likes 💯</p>
                  <p>• Engage with comments to boost your post 🔥</p>
                  <p>• Post during peak hours (6-9 PM UTC) ⏰</p>
                </CardContent>
              </Card>

              {/* Trending Tags */}
              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-700">
                <CardHeader>
                  <CardTitle className="text-white">🔥 Trending Now</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["#ReactHooks", "#StarknetDev", "#CairoLang", "#Web3Vibes", "#DegenCode"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-orange-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
