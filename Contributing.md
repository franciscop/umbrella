# Contributing

Thanks for contributing! Developing Umbrella is quite easy:

1. Clone the repository `git clone git+https://github.com/umbrellajs/umbrella.git && cd ./umbrellajs`
1. Install the dependencies `npm install`
1. Install grunt if you didn't have it
1. Run `grunt watch`
1. Modify any file within `/src` (code, tests or documentation)

After these steps, the library, tests and documentation will be automatically joined. To see the tests open `/test/index.html` in your browser. Please try not to make a PR with broken tests.

## New plugins

Recommended to copy one of the existing ones and modify the files, specially `addclass` (folder `/src/plugins/addclass`).
