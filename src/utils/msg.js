import { ElMessage } from 'element-ui'

// 事件名
const EventType = {
  // 生成JSON
  GENERATE: 'Generate',
  // 导入JSON
  IMPORT: 'Import'
}

const msg = {
  callback: undefined,
  post: (v) => {
    if (window.parent) {
      window.parent.postMessage(format(v), window.parent.origin)
    } else {
      ElMessage.error('找不到信号源')
    }
  },
  listener: (fn) => {
    msg.callback = (e) => {
      if (e.origin !== window.location.origin) return
      if (e.data?.type === EventType.IMPORT) {
        fn(e.data.data)
      }
    }
    window.addEventListener('message', msg.callback)
  },
  unlisten() {
    window.removeEventListener('message', msg.callback)
    msg.callback = undefined
  }
}

function format(val) {
  return {
    type: EventType.GENERATE,
    data: val
  }
}

export default msg
