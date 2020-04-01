.PHONY: clean pretty lint test coverage watch

clean:
	rm -rf ./build
	mkdir ./build

# https://prettier.io
pretty:
	npx prettier "src/**/*.ts" --write

# https://palantir.github.io/tslint/
lint:
	npx tslint --fix --project .

build: clean pretty lint
	npx ts-node src/build.ts
