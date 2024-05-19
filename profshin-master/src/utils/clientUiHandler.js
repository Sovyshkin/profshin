import device from 'current-device'
import {throttle} from '@/utils'
import {pinia, useUiStore} from '@/store'

const THROTTLE_TIMEOUT = 60
const isIe =
    typeof window !== 'undefined' &&
    Object.hasOwnProperty.call(window, 'ActiveXObject') &&
    !(window).ActiveXObject // Internet Explorer 6-11
// @ts-ignore
const isEdge = !isIe && !!window.StyleMedia // Edge 20+
const isUcBrowser = navigator.userAgent.toLowerCase().includes('ucbrowser')
const iframe = makeIframeAndPrepeareHTMLDocument()

function makeIframeAndPrepeareHTMLDocument() {
    const {head, body} = document

    // Тег <html> должен быть position: relative, что бы iframe был на всё высоту документа
    const style = document.createElement('style')
    const htmlStyles = 'html { position: relative !important }'
    style.type = 'text/css'
    head.appendChild(style)
    style.appendChild(document.createTextNode(htmlStyles))

    // Теперь можно создать iframe который всегда будет на всю высоту и ширину документа
    const iframe = document.createElement('iframe')
    iframe.setAttribute('id', '_resizeTrigger')
    iframe.setAttribute(
        'style',
        'position: absolute; z-index: -1; pointer-events: none; visibility: hidden; width: 100%; min-height: 100%; height: auto; top: 0; left: 0; border: none; opacity: 0;'
    )
    body.appendChild(iframe)

    return iframe
}

// Отлавливает всё, КРОМЕ высоты окна
function iframeResizeHandler() {
    console.log('resizing')
    const {innerWidth: windowWidth, innerHeight: windowHeight} = window
    const {innerWidth: documentWidth, innerHeight: documentHeight} = iframe.contentWindow
    const scrollbarWidth = windowWidth - documentWidth
    const viewportInfo = {
        windowWidth, // ширина ОКНА браузера, не зависит от наличия скроллбара или ширины контента страницы
        windowHeight, // высота ОКНА браузера, внимание - высота ОКНА, а не самой страницы
        documentWidth, // ширина контента страницы, уменьшается, если есть скроллбар, может быть меньше/больше ширины ОКНА браузера
        documentHeight, // высота контента, читай - самой страницы. как правило, больше высоты ОКНА
        scrollbarWidth, // ширина скроллбара, равна 0, если скроллбара нет или скроллбар поверх страницы
    }

    const ui = useUiStore()
    console.log(viewportInfo)
    ui.setViewportInfo(viewportInfo)
}

// Отлавливает ТОЛЬКО высоту ОКНА
function windowResizeHandler() {
    const ui = useUiStore()
    // Если изменилась ширина окна - то отработает iframeResizeHandler и всё будет хорошо
    if (ui.windowWidth === window.innerWidth) {
        console.log(window.innerWidth)
        ui.setWindowHeight(window.innerHeight)
    }
}

function windowScrollHandler() {
    const ui = useUiStore()
    ui.setScrollY(window.scrollY || window.pageYOffset)
}

export async function initStores() {
    // const companyStore = useCompanyStore()
    // companyStore.init()
}

export async function init() {
    const ui = useUiStore()

    ui.setIsIe(isIe)
    ui.setIsEdge(isEdge)
    ui.setIsUcBrowser(isUcBrowser)
    ui.setDevice({...device})

    if (isIe) document.documentElement.classList.add('is-ie')
    if (isEdge) document.documentElement.classList.add('is-edge')
    if (isUcBrowser) document.documentElement.classList.add('is-uc-browser')

    iframeResizeHandler()
    windowScrollHandler()

    window.addEventListener('scroll', throttle(windowScrollHandler, THROTTLE_TIMEOUT))
    window.addEventListener('resize', throttle(windowResizeHandler, THROTTLE_TIMEOUT));
    (iframe.contentWindow).addEventListener(
        'resize',
        throttle(iframeResizeHandler, THROTTLE_TIMEOUT)
    )
}

export function ready() {
    // const userStore = useUserStore(pinia)
    // const companyStore = useCompanyStore(pinia)
    // return userStore.ready && companyStore.ready
    return true
}
