const formatTime =  function(time){
  return moment(time).format("LL")
}

const formatSite = function(site){
  if(site == 1) {
    return '是'
  }else {
    return '否'
  }
}

const formatCold = function(cold){
  if(cold) {
    return '是'
  }else {
    return '否'
  }
}

const formatStart = function(start){
  if(start == 1) {
    return '使用中';
  }else {
    return '暂未使用'
  }
}

const formatTaskStatus = function(task){
  if(task == 1) {
    return '正在运行中'
  }else {
    return '已结束运行'
  }
}

export {
  formatTime,
  formatSite,
  formatCold,
  formatStart,
  formatTaskStatus
}