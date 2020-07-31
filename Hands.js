/*
* 手势库Hands
* @author： lyn
* */
let config = {
  doubleTapTime: 400,
  longTapTime: 700,
  holdTime: 1000,
  tapTime: 300,
  tapDistance: 3,
  limitDistanceForSwipe: 5
}
// 获取事件位置信息
let getEventInfo = (ev) => {
  let touches = ev.targetTouches.length ? ev.targetTouches : ev.changedTouches
  if (!touches || !touches.length) {
    return
  }
  return {
    pageX: touches[0].pageX,
    pageY: touches[0].pageY,
    screenX: touches[0].screenX,
    screenY: touches[0].screenY,
    clientX: touches[0].clientX,
    clientY: touches[0].clientY,
    timeStamp: ev.timeStamp
  }
}
// 自定义dom事件
let createHtmlEvent = (event, node, data) => {
  let gestureEvent = document.createEvent('Event')
  gestureEvent.initEvent(event, true, false)
  gestureEvent.extraInfo = data
  node.dispatchEvent(gestureEvent)
}
// 绑定事件
let addEvent = (el, type, fn) => {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else {
    el['on' + type] = fn
  }
}
// 移除事件
let removeEvent = (el, type, fn) => {
  if (el.removeEventListener) {
    el.removeEventListener(type, fn, false)
  } else {
    el['on' + type] = null
  }
}
// 获取两点直线距离
let getDistance = (startX, startY, endX, endY) => Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2))
// 计算斜边长
// eslint-disable-next-line no-unused-vars
let getHypotenuse = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
// 计算差值
let getDiff = (a, b) => Math.abs(a - b)
// 角度转弧度
// eslint-disable-next-line no-unused-vars
let angleToRadius = (angle) => Math.PI / 180 * angle
// 弧度转角度
// eslint-disable-next-line no-unused-vars
let radiusToAngle = (rad) => 180 / Math.PI * rad
// 获取滑动方向
let getDirection = (startX, startY, endX, endY, range = 10) => {
  let disX = endX - startX
  let disY = endY - startY
  let dis = getDistance(startX, startY, endX, endY)
  let angle = 180 / Math.PI * Math.atan2(disY, disX) || 0
  let direction = ''
  // console.log('getDirection', dis, angle)
  if (dis >= range && angle <= 45 && angle > -45) {
    direction = 'Right'
  }
  if (dis >= range && angle <= -45 && angle > -135) {
    direction = 'Up'
  }
  if (dis >= range && (angle <= -135 || angle > 135)) {
    direction = 'Left'
  }
  if (dis >= range && angle <= 135 && angle > 45) {
    direction = 'Down'
  }
  return {
    direction,
    angle
  }
}
// touch start回调
let start = function (ev) {
  const touches = ev.targetTouches
  if (!touches || !touches.length) {
    return
  }
  console.log('start', ev)
  // ev.preventDefault()
  if (ev.cancelable) {
    ev.preventDefault()
  }
  this.preMoveEvent = ev
  this.startEvent = ev
  const { pageX, pageY, timeStamp } = getEventInfo(ev)
  let extraData = {...getEventInfo(ev)}

  this.holdTimer = setInterval((ev) => {
    createHtmlEvent('hold', this.node, extraData)
  }, config.holdTime)

  if (ev.targetTouches.length === 1) {
    if (this.preStartEvent) {
      const prePosition = getEventInfo(this.preStartEvent)
      const disX = getDiff(pageX, prePosition.pageX)
      const disY = getDiff(pageY, prePosition.pageY)
      const timeRanges = getDiff(timeStamp, prePosition.timeStamp)
      if (disX <= 10 && disY <= 10 && timeRanges <= config.doubleTapTime) {
        createHtmlEvent('doubleTap', this.node, extraData)
        this.preStartEvent = null
      }
      if (timeRanges > config.doubleTapTime) {
        this.preStartEvent = ev
      }
    } else {
      this.preStartEvent = ev
    }
  }
}
// touch move回调
let move = function (ev) {
  const touches = ev.targetTouches
  if (!touches || !touches.length) {
    return
  }
  // console.log('move', ev)
  // ev.preventDefault()
  if (ev.cancelable) {
    ev.preventDefault()
  }
  this.moveEvent = ev
  const { pageX, pageY } = getEventInfo(ev)
  const preMoveEvent = getEventInfo(this.preMoveEvent)
  if (this.holdTimer) {
    clearInterval(this.holdTimer)
  }
  let preMoveX = preMoveEvent.pageX
  let preMoveY = preMoveEvent.pageY
  let disRange = config.limitDistanceForSwipe
  if (ev.targetTouches.length === 1) {
    let disX = getDiff(pageX, preMoveX)
    let disY = getDiff(pageY, preMoveY)
    if (disX >= disRange || disY >= disRange) {
      this.preMoveEvent = ev
      let extraData = {...getDirection(preMoveX, preMoveY, pageX, pageY, disRange), ...getEventInfo(ev)}
      createHtmlEvent('swipe', this.node, extraData)
    }
  }
}
// touch end回调
let end = function (ev) {
  const touches = ev.changedTouches
  if (!touches || !touches.length) {
    return
  }
  ev.preventDefault()
  this.endEvent = ev
  if (this.holdTimer) {
    clearInterval(this.holdTimer)
  }
  const { pageX, pageY, timeStamp } = getEventInfo(ev)
  const startEvent = getEventInfo(this.startEvent)
  let extraData = {...getEventInfo(ev)}
  let moveRange = config.tapDistance
  if (ev.changedTouches.length === 1) {
    let disX = getDiff(pageX, startEvent.pageX)
    let disY = getDiff(pageY, startEvent.pageY)
    let timeRanges = getDiff(timeStamp, startEvent.timeStamp)
    if (disX < moveRange && disY < moveRange && timeRanges >= config.longTapTime) {
      // console.log('long time press')
      createHtmlEvent('longTap', this.node, extraData)
    }
    if (disX < moveRange && disY < moveRange && timeRanges <= config.tapTime) {
      // console.log('single tap')
      createHtmlEvent('tap', this.node, extraData)
    }
  }
  createHtmlEvent('leave', this.node, extraData)
}

export default class Hands {
  constructor (node, options = {}) {
    if (!node || !(node instanceof HTMLElement)) {
      throw new Error(`Hands need single dom element as param, please check!`)
    }
    this.node = node.length > 1 ? node[0] : node
    this.preStartEvent = null
    this.startEvent = null
    this.moveEvent = null
    this.endEvent = null
    this.preMoveEvent = null
    this.holdTimer = null
    if (Object.keys(options).length) {
      config = { ...config, ...options }
    }
    this.init()
  }
  init () {
    console.log(Hands.API)
    addEvent(this.node, 'touchstart', start.bind(this))
    addEvent(this.node, 'touchmove', move.bind(this))
    addEvent(this.node, 'touchend', end.bind(this))
  }
  on (event, handler) {
    if (event === undefined || handler === undefined) {
      return
    }
    addEvent(this.node, event, handler)
    return this
  }
  off (event, handler) {
    if (event === undefined || handler === undefined) {
      return
    }
    removeEvent(this.node, event, handler)
    return this
  }
  static version = '0.0.1'
  static API = {
    desc: 'Hands是一个自定义的手势库，可以监听tap（点击）、longTap（长按）、doubleTap（双击）、leave（离开）、swipe（滑动）、hold（停留，按住未抬起，默认每隔1s触发一次）事件（每个事件event上有extraInfo属性，存储位置信息）',
    options: '可配置各个事件的一些阀值，doubleTapTime:双击间隔时间，默认400ms；longTapTime:长按时间阀值，默认700ms，holdTime:停留事件触发间隔时间，默认1000ms；tapTime: 单击时间阀值，默认300ms；tapDistance: 点击事件距离阀值，小于此值不算移动，默认3；limitDistanceForSwipe：滑动事件距离阀值，>=此值算滑动，默认5',
    on: '监听事件函数,支持链式调用',
    off: '移除事件监听函数， 支持链式调用'
  }
}
