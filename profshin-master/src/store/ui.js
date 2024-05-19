import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
    state: () => ({
        /* eslint max-len: 'off' */
        isIe: null ,
        isEdge: null ,
        isUcBrowser: null ,
        device: null, // <String> 'mobile', 'desktop' or 'tablet'
        windowWidth: 0, // ширина ОКНА браузера, не зависит от наличия скроллбара или ширины контента страницы
        windowHeight: 0, // высота ОКНА браузера, внимание - высота ОКНА, а не самой страницы
        documentWidth: 0, // ширина контента страницы, уменьшается, если есть скроллбар, может быть меньше/больше ширины ОКНА браузера
        documentHeight: 0, // высота контента, читай - самой страницы. как правило, больше высоты ОКНА
        scrollbarWidth: 0, // ширина скроллбара, равна 0, если скроллбара нет или скроллбар поверх страницы
        scrollY: 0,
        tabletBreakpoint: 768,
        desktopBreakpoint: 1024,
        xlDesktopBreakpoint: 1440,
        xs:600,
        sm: 780,
        md: 996,
        lg: 1000,
        xl: 1920,
        devMode:true,
        isSidebarActive: false,
        isGlobalLoaderActive: true,
        modals: [
            // { name: MODAL.CONFIRM_ACTION, isActive: false },
        ],
        overlayIsActive: null,
    }),
    getters: {
        isXs() {
            return this.windowWidth < this.sm;
        },
        isSm() {
            return this.windowWidth >= this.sm && this.windowWidth < this.md;
        },
        isMd() {
            return this.windowWidth >= this.md && this.windowWidth < this.lg;
        },
        isLg() {
            return this.windowWidth >= this.lg && this.windowWidth < this.xl;
        },
        isXl() {
            return this.windowWidth >= this.xl;
        },
        smAndDown() {
            return this.isSm || this.isXs;
        },
        mdAndDown() {
            return this.isSm || this.isXs || this.isMd;
        },
        lgAndDown() {
            return this.isSm || this.isXs || this.isMd || this.isLg;
        },
        smAndUp() {
            return this.isSm || this.isXl || this.isLg || this.isMd;
        },
        mdAndUp() {
            return this.isXl || this.isLg || this.isMd;
        },
        lgAndUp() {
            return this.isXl || this.isLg;
        },
        isMobileDevice({ device }) {
            if (!device) return null;

            return device.desktop();
        },
        isAppleDevice({ device }) {
            if (!device) return null;

            return device.ios() || navigator.platform.toLowerCase().includes("mac");
        },

        // Если нужно знать, когда изменится ширина или высота окна
        // Вместо window.addEventListener('resize') => watch: { windowSize() { ... } }
        windowSize({ windowWidth, windowHeight }) {
            return windowWidth + windowHeight;
        },
        // Если нужно знать, когда изменится ширина или высота документа
        documentSize({ documentWidth, documentHeight }) {
            return documentWidth + documentHeight;
        },
        isDesktopWidth({ windowWidth, desktopBreakpoint }) {
            return windowWidth >= desktopBreakpoint;
        },
        isMobileWidth({ windowWidth, tabletBreakpoint }) {
            return windowWidth < tabletBreakpoint;
        },
    },
    actions: {
        setIsIe(payload) {
            this.isIe = payload;
        },
        setIsEdge(payload) {
            this.isEdge = payload;
        },
        setIsUcBrowser(payload) {
            this.isUcBrowser = payload;
        },
        setDevice(payload) {
            this.device = payload;
        },
        setViewportInfo(payload) {
            this.windowWidth = payload.windowWidth;
            this.windowHeight = payload.windowHeight;
            this.documentWidth = payload.documentWidth;
            this.documentHeight = payload.documentHeight;
            this.scrollbarWidth = payload.scrollbarWidth;
        },
        setWindowHeight(payload) {
            this.windowHeight = payload;
        },
        setScrollY(payload) {
            this.scrollY = payload;
        },
        toggleSidebarActive() {
            this.isSidebarActive = !this.isSidebarActive;
        },
        setSidebarActive(bool){
            this.isSidebarActive = bool;
        },
        setIsGlobalLoaderActive(payload) {
            this.isGlobalLoaderActive = payload;
        },
        closeSidebar(){
            this.isSidebarActive = false;
        }
    },
});
