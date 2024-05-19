import {computed} from "vue";

export const GoodTypes = {
    RIMS: 'RIMS',
    TIRES: 'TIRES',
}

export const GoodTags = {
    SUMMER:'SUMMER',
    WINTER:'WINTER'
}

export const allGoodTypes=[GoodTags.SUMMER,GoodTags.WINTER]

export const allGoodsTypes = [
    GoodTypes.RIMS,
    GoodTypes.TIRES,
]


export const allGoodsTypesOptions = computed(()=>{
    return allGoodsTypes.map((x)=>{
        return {
            name:goodsTypesReadable(x),
            value:x
        }
    })
})
export const CarTypes = {
    PASSENGER:'PASSENGER',
    FREIGHT:'FREIGHT'
}
export const allCarTypes = [
    CarTypes.PASSENGER,
    CarTypes.FREIGHT,
]


export function carTypesReadable(type) {
    return (
        {
            [CarTypes.PASSENGER]: 'Легковой автомобиль',
            [CarTypes.FREIGHT]: 'Грузовой',
        }[type] || 'Неизвестный тип машины'
    )
}

export const allCarTypesOptions = computed(()=>{
    return allGoodsTypes.map((x)=>{
        return {
            name:goodsTypesReadable(x),
            value:x
        }
    })
})

export function goodsTagsSrc(type) {
    return (
        {
            [GoodTags.SUMMER]: require('../assets/tags/summer.svg'),
            [GoodTags.WINTER]: require('../assets/tags/winter.svg'),
        }[type] || 'Неизвестный тип товара'
    )
}

export function goodsTagsReadable(type) {
    return (
        {
            [GoodTags.SUMMER]:'Летняя',
            [GoodTags.WINTER]: 'Зимняя',
        }[type] || 'Неизвестный тип товара'
    )
}


export function goodsTypesReadable(type) {
    return (
        {
            [GoodTypes.RIMS]: 'Диски',
            [GoodTypes.TIRES]: 'Шины',
        }[type] || 'Неизвестный тип товара'
    )
}


export function characteristicsReadable(type) {
    return (
        {
            ['article']: 'Артикул',
            ['season']: 'Сезонность',
            ['car_type']: 'Тип автомобиля',
            ['profile_width']: 'Ширина профиля',
            ['profile_height']: 'Высота профиля',
        }[type] || 'Неизвестная характеристика'
    )
}

export function measuredReadable(type) {
    return (
        {
            ['profile_width']: ' мм.',
            ['profile_height']: '%',
        }[type] || ''
    )
}