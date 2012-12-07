Модификатор `level` задает уровень заголовка.

    // page.bemjson.js
    {
        block: 'headline',
        mods: { level: 3 },
        content: 'Примечание'
    }

    <!-- page.html -->
    <h3 class="headline headline_level_3">Примечание</h3>

Значение по-умолчанию — **1**