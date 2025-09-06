"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

interface SocialMediaChartProps {
  data: Array<{
    date: string
    engagement_rate: number
    likes: number
    shares: number
    comments: number
  }>
}

export function SocialMediaChart({ data }: SocialMediaChartProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")
  const [metric, setMetric] = React.useState("engagement_rate")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = data.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date(data[data.length - 1]?.date || new Date())
    let daysToSubtract = 30
    if (timeRange === "14d") {
      daysToSubtract = 14
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  const chartConfig = {
    engagement_rate: {
      label: "Engagement Rate",
      color: "hsl(142, 76%, 36%)", // Green 600
      format: (value: number) => `${value}%`
    },
    likes: {
      label: "Likes",
      color: "hsl(217, 91%, 60%)", // Blue 500
      format: (value: number) => value.toLocaleString()
    },
    shares: {
      label: "Shares",
      color: "hsl(270, 95%, 75%)", // Purple 400
      format: (value: number) => value.toLocaleString()
    },
    comments: {
      label: "Comments",
      color: "hsl(38, 92%, 50%)", // Amber 500
      format: (value: number) => value.toLocaleString()
    }
  } satisfies ChartConfig

  const metricConfig = chartConfig[metric as keyof typeof chartConfig]

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Engagement Analytics</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Daily {metricConfig.label.toLowerCase()} over time
          </span>
          <span className="@[540px]/card:hidden">
            {metricConfig.label}
          </span>
        </CardDescription>
        <CardAction className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-3 @[767px]/card:flex"
          >
            <ToggleGroupItem value="30d">30D</ToggleGroupItem>
            <ToggleGroupItem value="14d">14D</ToggleGroupItem>
            <ToggleGroupItem value="7d">7D</ToggleGroupItem>
          </ToggleGroup>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-32 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="30D" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="14d" className="rounded-lg">
                Last 14 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              aria-label="Select metric"
            >
              <SelectValue placeholder="Engagement Rate" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="engagement_rate" className="rounded-lg">
                Engagement Rate
              </SelectItem>
              <SelectItem value="likes" className="rounded-lg">
                Likes
              </SelectItem>
              <SelectItem value="shares" className="rounded-lg">
                Shares
              </SelectItem>
              <SelectItem value="comments" className="rounded-lg">
                Comments
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMetric" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`var(--color-${metric})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${metric})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  }}
                  indicator="dot"
                  formatter={(value) => [
                    metricConfig.format(value as number),
                    metricConfig.label
                  ]}
                />
              }
            />
            <Area
              dataKey={metric}
              type="natural"
              fill="url(#fillMetric)"
              stroke={`var(--color-${metric})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}