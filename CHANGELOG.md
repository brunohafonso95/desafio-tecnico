## 1.0.0 (2020-09-28)


### :sparkles: New Features

* add global middleware errors to get internal errors on application ([3d05ec4](https://github.com/brunohafonso95/desafio-tecnico/commit/3d05ec4e32c74b0d4e889f7ce8094c3f6f501de0))
* add graceful shutdown to the application ([0db370e](https://github.com/brunohafonso95/desafio-tecnico/commit/0db370efa5bca2ad2a2272ebe542d16efbf0788f))
* add graceful shutdown to the application ([da38b5d](https://github.com/brunohafonso95/desafio-tecnico/commit/da38b5dede4b249c6d66acfcdc3fcaf2758a1a43))
* add logger to the application ([3357cd3](https://github.com/brunohafonso95/desafio-tecnico/commit/3357cd3659c4ed16ad99a7509de897cf077daee6))
* add module-alias to make the path of imports more organized ([cb37a45](https://github.com/brunohafonso95/desafio-tecnico/commit/cb37a45959f4b1b077ea943264fd5ca8e3562c8c))
* add the setup base of express server ([c7d46f5](https://github.com/brunohafonso95/desafio-tecnico/commit/c7d46f592ebee115ae65348e453b66bf645dbd9b))
* add the signup user feature ([d632923](https://github.com/brunohafonso95/desafio-tecnico/commit/d63292391fb87a5758399579b500ef66aa40d218))
* add the user authentication feature ([215146e](https://github.com/brunohafonso95/desafio-tecnico/commit/215146ec27e57d1b12732379b4e494bdf5cc3a4f))
* add the validation of env variables ([b7a1927](https://github.com/brunohafonso95/desafio-tecnico/commit/b7a1927577dcf83957e4759c55d1e574db776a99))
* add validation to services of authentication and creation of user ([3a271f5](https://github.com/brunohafonso95/desafio-tecnico/commit/3a271f5afdb861cbadc028230e97b2e4587220f5))
* configure the mongodb connection ([f964161](https://github.com/brunohafonso95/desafio-tecnico/commit/f9641615466b05100bf5173d34dae60e390628da))


### :bug: Fixes

* adjust the use of method to validate users schema ([6725302](https://github.com/brunohafonso95/desafio-tecnico/commit/6725302dac4ef7e2063508795117fa0986a1ff56))


### :zap: Refactor

* add the dependency injection that was missing (joiAdapter) ([0167b88](https://github.com/brunohafonso95/desafio-tecnico/commit/0167b88eb88d7624e036c100d9e083af53fb060d))
* adjust on files format and adjust the imports ([ba1ac8f](https://github.com/brunohafonso95/desafio-tecnico/commit/ba1ac8fb623edbff4ce496ac0a284e0d76761764))
* change the implementaion of controllers to uncouple express ([871e925](https://github.com/brunohafonso95/desafio-tecnico/commit/871e92595d69690ce98e2a54b7cad7ee0df3a8c0))
* change the implementation of routes to use controllers factories ([c418e12](https://github.com/brunohafonso95/desafio-tecnico/commit/c418e12f7213bd0d2335d62b6ea9e61f9c1fc345))
* change the JoiAdapter export to export the class and not the instance of it ([dd1647c](https://github.com/brunohafonso95/desafio-tecnico/commit/dd1647c6bc10e35dee038b7cea6f0269457e4169))
* change the property on headers that store the session token ([61ffd38](https://github.com/brunohafonso95/desafio-tecnico/commit/61ffd3874389d6fc6a37ba187a4ebc519dd2a262))
* group all the interfaces export in just one file ([350deb6](https://github.com/brunohafonso95/desafio-tecnico/commit/350deb676656ca3a585947597ea2ab39f6a0c42b))
* move the middleware of bodyParser to a separated file ([02ff49c](https://github.com/brunohafonso95/desafio-tecnico/commit/02ff49cc667f45595d183030e4d98be538f323c6))


### :memo: Documentation

* add the swagger documentation to project ([c8e7dec](https://github.com/brunohafonso95/desafio-tecnico/commit/c8e7dec35a102fbbcdce839b2ee3bb45cc3886eb))


### :repeat: CI

* add the github actions workflow to deploy to heroku ([18b4282](https://github.com/brunohafonso95/desafio-tecnico/commit/18b4282a3bf745c93eeaf49a6dbfb8acacbf0c99))
