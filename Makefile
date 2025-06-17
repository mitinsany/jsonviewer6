# Makefile для проекта ExtJS с Docker

.PHONY: docker-build docker-shell sencha-generate sencha-build sencha-watch

# Сборка Docker-образа
docker-build:
	docker build -t jsonviewer-webpack .

# Запуск интерактивной оболочки в контейнере
docker-shell:
	docker run --rm -it -v ${PWD}:/code -w /code jsonviewer-webpack /bin/bash

# Генерация нового приложения ExtJS
sencha-generate:
	docker run --rm -v ${PWD}:/code -w /code jsonviewer-webpack sencha -sdk /opt/ext generate app -ext -classic JsonViewer /code

# Сборка приложения
sencha-build:
	docker run --rm -v ${PWD}:/code -w /code jsonviewer-webpack sencha app build

# Запуск в режиме разработки с watch
sencha-watch:
	docker run --rm -p 1841:1841 -v ${PWD}:/code -w /code jsonviewer-webpack sencha app watch

# Алиасы для удобства
build: docker-build
shell: docker-shell
generate: sencha-generate
prod: sencha-build
dev: sencha-watch
