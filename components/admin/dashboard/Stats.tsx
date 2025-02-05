import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { count, sql } from "drizzle-orm";
import Image from "next/image";
import React from "react";

const getStats = async (
  table: any,
  condition?: any
): Promise<{
  currentWeekCount: number;
  prevWeekCount: number;
  total: number;
}> => {
  const startOfCurrentWeek = dayjs()
    .startOf("week")
    .subtract(1, "day")
    .toISOString();
  const startOfPrevWeek = dayjs()
    .startOf("week")
    .subtract(1, "week")
    .subtract(1, "day")
    .toISOString();
  const endOfPrevWeek = dayjs()
    .startOf("week")
    .subtract(1, "day")
    .toISOString();

  const [stats] = await db
    .select({
      total: count(),
      prevWeekCount: sql<number>`
      CAST(COUNT(CASE 
        WHEN ${table.createdAt} >= ${startOfPrevWeek} AND ${table.createdAt} <= ${endOfPrevWeek} 
        THEN 1 
        ELSE null 
      END) as int)`,
      currentWeekCount: sql<number>`
      CAST(COUNT(CASE 
        WHEN ${table.createdAt} >= ${startOfCurrentWeek}
        THEN 1 
        ELSE null 
      END) as int )`,
    })
    .from(table)
    .where(condition ? condition : undefined);
  return stats;
};

const labels = ["Borrowed Books", "Total Users", "Total Books"];
const Stats = async () => {
  const stats = await Promise.all([
    getStats(borrowRecords),
    getStats(users),
    getStats(books),
  ]);

  return (
    <div className="flex flex-wrap justfiy-between gap-4 items-center">
      {stats.map((stat, i) => (
        <div key={i} className="stat">
          <div className="stat-info">
            <h5 className="stat-label">{labels[i]}</h5>
            <div className="flex items-center gap-2">
              <Image
                alt="caret"
                src={
                  stat.currentWeekCount > stat.prevWeekCount
                    ? "/icons/admin/caret-up.svg"
                    : "/icons/admin/caret-down.svg"
                }
                width={13}
                height={13}
              />
              <p
                className={cn(
                  stat.currentWeekCount > stat.prevWeekCount
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {stat.currentWeekCount > 0
                  ? stat.currentWeekCount.toFixed(0)
                  : stat.currentWeekCount - stat.prevWeekCount}
              </p>
            </div>
          </div>
          <h2 className="stat-count">{stat.total.toFixed(0)}</h2>
        </div>
      ))}
    </div>
  );
};

export default Stats;
