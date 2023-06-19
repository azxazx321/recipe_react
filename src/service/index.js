export let base = 'https://douyu.xin88.top'
export let serverBase = 'http://serverms.xin88.top'

export let getLiveLists = async (page) => {
    let url = base + `/api/room/list?page=${page}&type=ms`
    
    let res = await fetch(url)

    let data = await res.json()
    console.log(data,'live')
    return data
}

export let getProductLists = async (page) => {
    let url = serverBase + `/mall?page=${page}`
    let res = await fetch(url)
    let data = await res.json()
    return data
}

export const handleScroll = (a) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 150;
    a(isAtBottom);
  };