"use client"

import { useEffect, useState, useMemo } from "react"
import { SocialMediaChart } from "@/components/social-media-chart"
import { SocialMediaTable } from "@/components/social-media-table"
import { SocialMediaCards } from "@/components/social-media-cards"
import { DateRangePicker } from "@/components/date-range-picker"
import socialMediaData from "@/app/dashboard/social-media-data.json"

export default function Page() {
  const [stats, setStats] = useState({
    totalFollowers: 0,
    engagementRate: 0,
    postsThisMonth: 0,
    followersChange: 0,
    engagementChange: 0,
    postsChange: 0
  })
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  })
  const [isLoading, setIsLoading] = useState(false)

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) {
      return socialMediaData
    }
    
    return socialMediaData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= dateRange.from! && itemDate <= dateRange.to!
    })
  }, [dateRange])

  const handleDateRangeApply = () => {
    setIsLoading(true)
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500)
  }

  useEffect(() => {
    // Calculate summary statistics from the filtered data
    if (filteredData.length === 0) return
    
    const latestData = filteredData[filteredData.length - 1]
    const previousData = filteredData.length > 7 ? filteredData[filteredData.length - 8] : null

    const totalFollowers = latestData.followers
    const engagementRate = latestData.engagement_rate
    
    // Calculate posts in the filtered period
    const postsInPeriod = filteredData.reduce((total, day) => total + day.posts, 0)
    
    // Calculate percentage changes
    const followersChange = previousData ? 
      ((latestData.followers - previousData.followers) / previousData.followers) * 100 : 0
    
    const engagementChange = previousData ? 
      ((latestData.engagement_rate - previousData.engagement_rate) / previousData.engagement_rate) * 100 : 0
    
    // For posts change, compare with previous period if we have enough data
    let postsChange = 0
    if (filteredData.length > 14) {
      const currentPeriodPosts = filteredData.slice(-7).reduce((total, day) => total + day.posts, 0)
      const previousPeriodPosts = filteredData.slice(-14, -7).reduce((total, day) => total + day.posts, 0)
      postsChange = previousPeriodPosts > 0 ? 
        ((currentPeriodPosts - previousPeriodPosts) / previousPeriodPosts) * 100 : 0
    }

    setStats({
      totalFollowers,
      engagementRate,
      postsThisMonth: postsInPeriod,
      followersChange: Math.round(followersChange * 10) / 10,
      engagementChange: Math.round(engagementChange * 10) / 10,
      postsChange: Math.round(postsChange * 10) / 10
    })
  }, [filteredData])

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Date Range Picker */}
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Social Media Analytics</h2>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onApply={handleDateRangeApply}
              isLoading={isLoading}
            />
          </div>
        </div>
        
        <SocialMediaCards stats={stats} />
        <div className="px-4 lg:px-6">
          <SocialMediaChart data={filteredData} />
        </div>
        <div className="px-4 lg:px-6">
          <SocialMediaTable data={filteredData} />
        </div>
      </div>
    </div>
  )
}