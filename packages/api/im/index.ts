import Base from '../base'
import type * as Types from './types'

const prefix = '/api-gateway'
class IM extends Base {
  constructor() {
    super({ API_KEY: 'IM_API_URL' })
  }

  webAnchors = this.apiGenerator<Types.IWebAnchors>({ url: `${prefix}/v1/anchor/web-anchors` })
  webAnchorDetail = this.apiGenerator<Types.IWebAnchorDetail>({ url: `${prefix}/v1/anchor/web-anchor/detail` })
  webAnchorMatchList = this.apiGenerator<Types.IWebAnchorMatches>({ url: `${prefix}/v1/anchor/web-anchor/match-list` })
  webAnchorLife = this.apiGenerator<Types.IWebAnchorLife>({ url: `${prefix}/v1/anchor/web-anchor/life` })
  webAnchorPhotos = this.apiGenerator<Types.IWebAnchorPhotos>({ url: `${prefix}/v1/anchor/web-anchor/photos` })
  webAnchorInfo = this.apiGenerator<Types.IWebAnchorInfo>({ url: `${prefix}/v1/anchor/web-anchor/info` })
  webAnchorRecommend = this.apiGenerator<Types.IWebAnchorRecommend>({ url: `${prefix}/v1/anchor/web-anchor/recommend` })
  webAnchorLanguage = this.apiGenerator<Types.IWebAnchorLanguage>({ url: `${prefix}/v1/anchor/web-anchor/language` })
  webAnchorLanguageConstants = this.apiGenerator<Types.IWebAnchorLanguageConstants>({ url: `${prefix}/v1/anchor/web-anchor/language/constants` })

  expertPredictions = this.apiGenerator<Types.IExpertPredictions>({ url: `${prefix}/v1/expert/predictions` })
  expertRecommend = this.apiGenerator<Types.IExpertRecommand>({ url: `${prefix}/v1/expert/recommend` })
  expertInfo = this.apiGenerator<Types.IExpertInfo>({ url: `${prefix}/v1/expert/info` })
  expertArticleNow = this.apiGenerator<Types.IExpertArticleNow>({ url: `${prefix}/v1/expert/article/now` })
  expertArticleHistory = this.apiGenerator<Types.IExpertArticleHistory>({ url: `${prefix}/v1/expert/article/history` })
  expertArticleHit = this.apiGenerator<Types.IExpertArticleHit>({ url: `${prefix}/v1/expert/article/hit` })
  expertStatistics = this.apiGenerator<Types.IExpertStatistics>({ url: `${prefix}/v1/expert/statistics` })
  expertMatchArticle = this.apiGenerator<Types.IExpertMatchArticle>({ url: `${prefix}/v1/expert/match/article` })
  expertArticleDetail = this.apiGenerator<Types.IExpertArticleDetail>({ url: `${prefix}/v1/expert/article/detail` })

  // for testing
  chatroomPastMessage = this.apiGenerator<Types.IChatroomPastMessage>({ url: `${prefix}/v1/chat-room/past-message` })
  chatroomSelfOrders = this.apiGenerator<Types.IChatroomSelfOrders>({ url: `${prefix}/product/business/bets/ordersWithIid` })
  chatroomOtherOrders = this.apiGenerator<Types.IChatroomOtherOrders>({ url: `${prefix}/product/chat/betOrder/getOthers` })
}

export default new IM()
