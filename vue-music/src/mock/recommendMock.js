import Mock from 'mockjs'
// import { SUCCRSS, ERROR } from './config'

// const Random = Mock.Random

const recommendMockData = {
  'code': '0000',
  'data|1-10': [{
    'id': '@guid',
    'picUrl': "@image('200x100', '#50B347', '#FFF', 'EasyMock')",
    'linkUrl': '@url'
  }],
  'message': 'success'
}

Mock.mock('/api/getRecommend', 'get', recommendMockData)
