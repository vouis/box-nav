const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'B', logoType: 'text', url: 'https://www.bilibili.com' },
    { logo: 'M', logoType: 'image', url: 'https://mail.google.com' },
    { logo: 'B', logoType: 'image', url: 'https://baidu.com' },
    { logo: 'I', logoType: 'image', url: 'https://www.iconfont.cn' },
    { logo: 'C', logoType: 'image', url: 'https://www.cnki.net' },
    { logo: 'J', logoType: 'image', url: 'https://juejin.im' }
]

const removeHttps = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')

}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        //node.logo = removeHttps(node.url)[0].toUpperCase()
        const $li = $(`<li><div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${removeHttps(node.url)}</div>
                <div class="close"><svg class="icon" >
    <use xlink:href="#icon-Close"></use>
</svg></div>
            
            </div></li>`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index, 1)
            render()
        })


    })
}

render();
$('.add')
    .on('click', () => {
        let url = window.prompt('请输入网址：')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url;
            //console.log(url)
        }

        hashMap.push({ logo: removeHttps(url)[0].toUpperCase(), logoType: 'image', url: url })
        render();
    });

window.onbeforeunload = () => {
    //console.log('uemianguyanbi1')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    hashMap.forEach((node, index) => {
        if (node.logo.toLowerCase() === key) {
            window.open(node.url)
        }
    })
})