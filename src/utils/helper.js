export const capitalize = (string, normal=false) => {
  if(normal) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else string.replace(/([-_]\w)/g, g => g[1].toUpperCase())
}

export const qs = (obj) => obj && Object.keys(obj).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
}).join('&');


export const downloadFile = (res, type) => {
  let url = "";
  if(type !== "view"){
    const pdfBlob = new Blob([res.data], { type: "application/pdf" })
    url = window.URL.createObjectURL(pdfBlob)
  } else url = res.data.url
  
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `invoice-${new Date().getTime()}.pdf`)
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
