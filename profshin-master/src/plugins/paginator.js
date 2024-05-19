import {ref} from "vue";

export default function BackendPaginatorPlugin() {
    return (context) => {
        if ('paginator' in context.options) {
            return {
                currentPage: ref(1),
                pageSize: ref(Number.parseInt(process.env.VUE_APP_DEFAULT_PAGE_SIZE)),
                totalPages: ref(1),
                objectsCount: ref(0),
                SET_PAGE_SIZE(val) {
                    this.pageSize = val
                },
                SET_CURRENT_PAGE(val) {
                    this.currentPage = val
                },
                SET_TOTAL_PAGES(val) {
                    this.totalPages = val
                },
                SET_COUNT(val) {
                    this.objectsCount = val
                },

            }
        }
    }
}