import type { IPushMessageEntity } from 'protobuf/im/types'
import type { withData } from '../types'

export type IChatMessage = IPushMessageEntity

export interface IChatroomPastMessage {
  query: {
    chatId: string
    cursor?: string
    quantity?: number
  }
  body: null
  res: withData<{
    list: IChatMessage[]
  }>
}

export interface IBetOrderDetails {
  sid: any
  tournamentName: string
  iid: number
  homeName: string
  awayName: string
  kickOffTime: string
  odds: string
  market: string
  betOn: string
  conditions: string
  settle: number
  outright: boolean
  inplay: boolean
  period: string
  stage: string
  cashoutPeriod: string
  cashoutStage: string
  orderPhase: number
  homeScore: string
  awayScore: string
  probability: string
  vendor: string
  tid: number
  homeId: number
  awayId: number
  safeFlag: boolean
  scoreType: string
  matchScore: { h: string; a: string }
}

export interface ISelfOrder {
  uuid: string | RegExp
  ante: number
  totalAnte: number
  payout: number
  mayWinAmount: number
  netWin: number
  parlayBet: boolean
  parlay: number
  option: number
  canceled: boolean
  details: IBetOrderDetails[]
  marketType: string
  status: number
  cashOut: boolean
  currency: string
  tnPriority: number
  orderStatus: number
  safeFlag: boolean
  betTime: string
}

export interface IChatroomSelfOrders {
  query: {
    iid: number
    quantity?: number
  }
  body: null
  res: withData<{
    list: ISelfOrder[]
  }>
}

export interface IOtherOrder {
  iid: number
  nickName: string
  account: string
  vip: number
  avatar: number
  betOrder: ISelfOrder
}

export interface IChatroomOtherOrders {
  query: {
    iid: number
    quantity?: number
  }
  body: null
  res: withData<{
    list: IOtherOrder[]
  }>
}

export interface IBetOrder extends ISelfOrder {
  iid?: number
  nickName?: string
  account?: string
  vip?: number
  avatar?: number
  betOrder?: ISelfOrder
}

export type IFetchData = IChatroomSelfOrders['res']['data'] | IChatroomOtherOrders['res']['data']
