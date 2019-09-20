type IRequestAF = (callback: FrameRequestCallback) => number

let requestAnimationFrame: IRequestAF = window.requestAnimationFrame 
  || window.webkitRequestAnimationFrame
  || function (callback) { setTimeout(callback, 1000 / 60) }

export {
  requestAnimationFrame
}