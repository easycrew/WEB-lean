import Mock from 'mockjs'
import { SUCCESS, ERROR } from './config'

const recommendMockData = Object.assign({}, SUCCESS, {
  'data|1-10': [{
    'id': '@guid',
    'picUrl': "@image('200x100', '#50B347', '#FFF', 'ImgMock')",
    'linkUrl': '@url'
  }]
})

Mock.mock('/api/getRecommend', 'get', recommendMockData)
