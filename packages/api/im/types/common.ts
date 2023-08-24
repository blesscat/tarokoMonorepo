import type { SidType } from 'utils/types'

/** 1: 足球 2: 籃球 3: 網球 4: 棒球 */
export type SportId =  Exclude<SidType, 0>

export interface withData<T> {
  message: string
  code: number
  data: T
  serverTime: number
}

export type ApiType<TRes> = {
  query: {[key: string]: string | number},
  body: {[key: string]: string | number}
  res: TRes
}

export interface IPager {
  pageIdx: number
  pageSize: number
  totalPage: number
  totalRow: number
}

export interface IOdds {
  h: string
  a: string
  d: string
  k: string
  ov: string
  ud: string
}

export const MarketTypeMap = {
  11: 'ml',
  21: 'ml',
  12: 'ah',
  22: 'ah',
  13: 'ou',
  23: 'ou',
} as const

export type MarketType = `${keyof typeof MarketTypeMap}`

export interface IPredictionMarket {
  // 盤口類型
  // 足球：獨贏(11)、讓球(12)、大小(13)
  // 篮球：獨贏(21)、讓球(22)、大小(23)
  marketType: MarketType
  // 專家預測結果
  // 獨贏: 主隊(h)、客隊(a)
  // 讓球: 主隊(h)、客隊(a)
  // 大小: 大(ov)、小(ud)
  matchResult: 'h' | 'a' | 'ov' | 'ud'
  odds: IOdds[]
}

/** 1: 未開始 2: 進行中 3: 結束 4: 延期 5: 中斷 6: 腰斬 7: 取消 8: 待定 */
export type MatchStatus = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/** 1: 命中 2: 未中 */
export type HitStatus = 1 | 2

/** 1: 開放 2: 未開放 */
export type ArticleStatus = 1 | 2

export interface IMatch {
  homeName: string
  homeId: number
  awayName: string
  awayId: number
  tid: number
  tnName: string
}