import {nextTick, onMounted, reactive, ref, watch} from "vue";

export const usePagination = (getDataPagination, perPage = 20) => {
    // Глобальное закрытие доступа к отправкам запросов
    const globalDisable = ref(false);

    // Пагинация
    const container = ref(null);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const isOldPagination = ref(true);

    const products = reactive({
        items: []
    });

    const params = reactive({
        page: null,
        perPage: perPage, // Карточек на страницу
    });

    // Логика загрузки данных
    const loadingData = async (page = 1) => {
        globalDisable.value = true;

        // Прокручиваем страницу вверх
        await nextTick(() => {
            container.value.scrollIntoView({behavior: 'smooth'});
        });

        params.page = page;

        // Запрос получения данных
        const responseData = await getDataPagination(params);

        products.items = responseData['data'] ?? [];

        // Обновление пагинации
        currentPage.value = responseData['current_page'] ?? 1;
        totalPages.value = responseData['last_page'] ?? 1;

        globalDisable.value = false;
    };

    // Загрузка по умолчанию
    onMounted(async () => {
        await loadingData();
    });

    // Наблюдаем за переходом на другую страницу
    watch(currentPage, async (newPage, oldPage) => {
        if (isOldPagination.value) {
            isOldPagination.value = false;

            await loadingData(newPage);

            isOldPagination.value = true;
        }
    });

    return {
        globalDisable,
        container,
        currentPage,
        totalPages,
        products
    };
};