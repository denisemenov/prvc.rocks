#!/bin/bash

# Файл, в котором будет храниться предыдущая версия программы Pritunl
PREVIOUS_VERSION_FILE="/home/den/web/prvc.rocks/previous_version.txt"

# Директория, из которой нужно скопировать файл при изменении версии
SOURCE_DIR="/home/den/web/prvc.rocks/dist"

# Директория, в которую нужно скопировать файл при изменении версии или отсутствии предыдущей версии
DESTINATION_DIR="/usr/share/pritunl/www/"

# Проверка изменения версии программы
check_version() {
    # Получение текущей версии программы Pritunl
    current_version=$(pritunl version | awk '{print $2}')
    
    # Проверка, существует ли предыдущая версия
    if [ -f "$PREVIOUS_VERSION_FILE" ]; then
        # Получение предыдущей версии программы Pritunl из файла
        previous_version=$(cat "$PREVIOUS_VERSION_FILE")
        
        # Сравнение текущей и предыдущей версий
        if [ "$current_version" != "$previous_version" ]; then
            echo "Версия программы Pritunl изменилась. Текущая версия: $current_version"
            # Вставьте сюда команды, которые нужно выполнить при изменении версии
            copy_file
        else
            echo "Версия программы Pritunl не изменилась."
            # Вставьте сюда команды, которые нужно выполнить, если версия не изменилась
        fi
    else
        echo "$current_version" > "$PREVIOUS_VERSION_FILE"
        echo "Предыдущая версия не найдена. Записана текущая версия: $current_version"
        # Вставьте сюда команды, которые нужно выполнить при первом запуске скрипта
        copy_file
    fi
}

# Копирование файла из одной директории в другую
copy_file() {
    echo "Копирование файла из $SOURCE_DIR в $DESTINATION_DIR"
    # Вставьте сюда команду для копирования файла
    cp "$SOURCE_DIR/404.html" "$DESTINATION_DIR"
    cp "$SOURCE_DIR/download.html" "$DESTINATION_DIR/key_view.html"
    # Замените "filename" на имя реального файла, который нужно скопировать
}

replace_string_404() {
    # Путь к файлу errors.py
    FILE_PATH="/usr/lib/pritunl/usr/lib/python3.9/site-packages/pritunl/handlers/errors.py"
    
    # Строка для замены
    OLD_LINE="return '404: Not Found', 404"
    NEW_LINE="return open('/usr/share/pritunl/www/404.html'), 404"
    
    # Проверка наличия файла
    if [ -f "$FILE_PATH" ]; then
        # Поиск и замена строки
        sed -i "s|$OLD_LINE|$NEW_LINE|g" "$FILE_PATH"
        echo "Строка успешно заменена в файле: $FILE_PATH"
    else
        echo "Файл не найден: $FILE_PATH"
    fi
}

replace_string_key() {
    # Путь к файлу errors.py
    FILE_PATH="/usr/lib/pritunl/usr/lib/python3.9/site-packages/pritunl/handlers/key.py"
    
    # Строка для замены
    OLD_LINES=(
        "        key_page = key_page.replace('<%= user_name %>', '%s - %s' % ("
        "        org.name, usr.name))"
    )
    NEW_LINE="key_page = key_page.replace('<%= user_name %>', usr.name)"
    
    # Проверка наличия файла
    if [ -f "$FILE_PATH" ]; then
        # Поиск и замена строки
        sed -i "s|$OLD_LINE|$NEW_LINE|g" "$FILE_PATH"
        echo "Строка успешно заменена в файле: $FILE_PATH"
    else
        echo "Файл не найден: $FILE_PATH"
    fi
}

# Запуск функции проверки версии программы
check_version
