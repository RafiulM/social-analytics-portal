"use client"

import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SocialMediaStats {
  totalFollowers: number
  engagementRate: number
  postsThisMonth: number
  followersChange: number
  engagementChange: number
  postsChange: number
}

interface SocialMediaCardsProps {
  stats: SocialMediaStats
}

export function SocialMediaCards({ stats }: SocialMediaCardsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getTrendIcon = (change: number) => {
    return change >= 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />
  }

  const getTrendColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-3">
      {/* Total Followers Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Followers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats.totalFollowers)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={getTrendColor(stats.followersChange)}>
              {getTrendIcon(stats.followersChange)}
              {Math.abs(stats.followersChange)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.followersChange >= 0 ? 'Growing steadily' : 'Needs attention'} 
            {getTrendIcon(stats.followersChange)}
          </div>
          <div className="text-muted-foreground">
            Audience growth this month
          </div>
        </CardFooter>
      </Card>

      {/* Engagement Rate Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Engagement Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.engagementRate}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={getTrendColor(stats.engagementChange)}>
              {getTrendIcon(stats.engagementChange)}
              {Math.abs(stats.engagementChange)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.engagementChange >= 0 ? 'Strong interaction' : 'Lower engagement'} 
            {getTrendIcon(stats.engagementChange)}
          </div>
          <div className="text-muted-foreground">
            Audience interaction quality
          </div>
        </CardFooter>
      </Card>

      {/* Posts This Month Card */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Posts This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.postsThisMonth}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className={getTrendColor(stats.postsChange)}>
              {getTrendIcon(stats.postsChange)}
              {Math.abs(stats.postsChange)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.postsChange >= 0 ? 'Active posting' : 'Reduced activity'} 
            {getTrendIcon(stats.postsChange)}
          </div>
          <div className="text-muted-foreground">
            Content publication frequency
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}