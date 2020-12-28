// 导出excel
import axios from "axios";

export function exportData(tokens, data, url, fileName) {
  axios({
    method: 'post',
    responseType: 'blob',
    url: process.env.VUE_APP_BASE_API + url,
    data: data,
    headers: {
      'Authorization':tokens
    }
  }).then(res => {
    if (res.status === 200) {
      let blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel'
      })
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = 'none';
      link.href = url;
      link.download = fileName + ".xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.$message.error('导出失败');
    }
  })
}
export function exportData1(tokens, data, url, fileName) {
  axios({
    method: 'post',
    responseType: 'blob',
    url: process.env.VUE_APP_GATEWAY_API + url,
    data: data,
    headers: {
      'Authorization':tokens
    }
  }).then(res => {
    if (res.status === 200) {
      let blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel'
      })
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = 'none';
      link.href = url;
      link.download = fileName + ".xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.$message.error('导出失败');
    }
  })
}
export function BatchExport(tokens, data, url, fileName) {
  axios({
    method: 'post',
    responseType: 'blob',
    url: process.env.VUE_APP_GATEWAY_API + url,
    data: data,
    headers: {
      'Authorization':tokens
    }
  }).then(res => {
    if (res.status === 200) {
      let blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel'
      })
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = 'none';
      link.href = url;
      link.download = fileName + ".xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      this.$message.error('导出失败');
    }
  })
}

//签报详情导出
export function exportWord(tokens, data, url,fileName) {
  axios({
    method: 'post',
    responseType: 'blob',
    url: process.env.VUE_APP_GATEWAY_API + url,
    data: data,
    headers: {
      'Authorization':tokens
    }
  }).then(res => {
    debugger
    const blob = new Blob([res.data], {
      type: 'application/msword'
    })
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName+'.doc'  //命名下载名称
      elink.style.display = 'none'
      elink.href = content //表示一个指定的file对象或Blob对象
      document.body.appendChild(elink)
      elink.click()  //点击触发下载
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  })
}

//签报详情导出
export function fundSelectExprot(tokens, data, url,fileName) {
  axios({
    method: 'post',
    responseType: 'blob',
    url: process.env.VUE_APP_GATEWAY_API + url,
    data: data,
    headers: {
      'Authorization':tokens
    }
  }).then(res => {
    const content = res.data
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName+'.csv'  //命名下载名称
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob) //表示一个指定的file对象或Blob对象
      document.body.appendChild(elink)
      elink.click()  //点击触发下载
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  })
}

