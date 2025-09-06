"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share2,
  Shield,
  Zap,
  Target,
  LineChart,
  PieChart,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButtons, HeroAuthButtons } from "@/components/auth-buttons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 relative px-4">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
            <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 bg-clip-text text-transparent font-parkinsans">
            Social Analytics Portal
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 mb-8">
          Transform your social media presence with powerful analytics, real-time insights, and comprehensive performance tracking across all your platforms.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-sm">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300">Real-time Analytics</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full text-sm">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 dark:text-purple-300">Engagement Tracking</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm">
            <LineChart className="w-4 h-4 text-green-600" />
            <span className="text-green-700 dark:text-green-300">Performance Insights</span>
          </div>
        </div>
        
        <HeroAuthButtons />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-8 max-w-6xl">
        {/* Key Features */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Everything you need to grow your social presence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor, analyze, and optimize your social media performance with our comprehensive analytics dashboard
          </p>
        </div>

        {/* Analytics Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {/* Real-time Analytics */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg">Real-time Dashboard</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Monitor your social media metrics in real-time with interactive charts and live data updates.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Live follower count tracking</li>
              <li>• Instant engagement updates</li>
              <li>• Real-time performance alerts</li>
            </ul>
          </Card>

          {/* Engagement Analytics */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200/50 dark:border-purple-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg">Engagement Insights</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Deep dive into likes, shares, comments, and engagement rates across all your content.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Engagement rate calculations</li>
              <li>• Content performance analysis</li>
              <li>• Audience interaction trends</li>
            </ul>
          </Card>

          {/* Growth Tracking */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200/50 dark:border-green-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-lg">Growth Analytics</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Track follower growth, reach expansion, and audience development over time.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Follower growth tracking</li>
              <li>• Reach and impressions analysis</li>
              <li>• Growth rate calculations</li>
            </ul>
          </Card>

          {/* Content Performance */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-orange-200/50 dark:border-orange-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-lg">Content Analysis</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Analyze which content performs best and optimize your posting strategy.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Post performance metrics</li>
              <li>• Content type analysis</li>
              <li>• Optimal posting times</li>
            </ul>
          </Card>

          {/* Data Visualization */}
          <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 border-cyan-200/50 dark:border-cyan-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                <PieChart className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="font-semibold text-lg">Visual Reports</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Beautiful charts and graphs make it easy to understand your social media performance.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Interactive charts and graphs</li>
              <li>• Custom date range filtering</li>
              <li>• Exportable reports</li>
            </ul>
          </Card>

          {/* Secure & Private */}
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-200/50 dark:border-indigo-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-lg">Secure & Private</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              Your data is protected with enterprise-grade security and privacy controls.
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• End-to-end encryption</li>
              <li>• Secure authentication</li>
              <li>• Privacy-first approach</li>
            </ul>
          </Card>
        </div>

        {/* Sample Metrics Preview */}
        <Card className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Track What Matters</h3>
            <p className="text-muted-foreground">
              Get insights into all the metrics that drive your social media success
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">125K</div>
              <div className="text-sm text-muted-foreground">Total Followers</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">4.2%</div>
              <div className="text-sm text-muted-foreground">Engagement Rate</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Eye className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">2.1M</div>
              <div className="text-sm text-muted-foreground">Monthly Reach</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <Share2 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">856</div>
              <div className="text-sm text-muted-foreground">Shares This Week</div>
            </div>
          </div>
        </Card>

        {/* Getting Started */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <Zap className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Social Media?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of creators and businesses who use our analytics platform to grow their social media presence and engage their audience more effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Live Demo
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}