import bg1 from './assets/bgImage/bg1.jpg';
import bg2 from './assets/bgImage/bg2.jpg';
import bg3 from './assets/bgImage/bg3.jpg';
import bg4 from './assets/bgImage/bg4.jpg';

const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const imgArray = [null,bg1,bg2,bg3,bg4]
let i=1;

const hashMap = xObject || [
    { logo: 'B', logoType: 'text', url: 'https://www.bilibili.com' },
    { logo: 'M', logoType: 'image', url: 'https://mail.google.com' },
    { logo: 'B', logoType: 'image', url: 'https://baidu.com' },
    { logo: 'I', logoType: 'image', url: 'https://www.iconfont.cn' },
    { logo: 'C', logoType: 'image', url: 'https://www.cnki.net' },
    { logo: 'J', logoType: 'image', url: 'https://juejin.im' },
    {logo: 'Y', logoType: 'image', url: 'https://www.yuque.com'}
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
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${removeHttps(node.url)}</div>
                <div class="close">
                <svg class="icon" >
    <use xlink:href="#icon-Close"></use></svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);

        $li.on('click', () => {
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
        }

        hashMap.push({ logo: removeHttps(url)[0].toUpperCase(), logoType: 'image', url: url })
        render();
    });


$('.changeTheme')
    .on('click', () => {
        let showImg = imgArray[i%imgArray.length];
        $('body').css('background-image', `url(${showImg})`);
        i++;
    });


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    hashMap.forEach((node) => {
        if (node.logo.toLowerCase() === key) {
            window.open(node.url)
        }
    })
})