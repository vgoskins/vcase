client/node_modules:
	@cd client && npm install

vgomock/node_modules:
	@cd vgomock && npm install

node_modules:
	@npm install

.PHONY:prettier
prettier: build
	@npm run prettier

.PHONY:lint-js
lint: build
	@npm run lint

.PHONY: dev
dev: build
	@npm run dev

.PHONY: vgo-mock
vgo-mock: vgomock/node_modules
	@npm run vgo-mock

.PHONY: build
build: client/node_modules node_modules

.PHONY: rebuild
rebuild: clean build

.PHONY: clean
clean:
	@rm -rf node_modules
	@rm -rf client/node_modules
	@rm -rf vgomock/node_modules

.PHONY: static-files
static-files: client/node_modules
	@rm -rf public/*
	@cd client && npm run build
	@mv client/build/* public/
