Deployment Steps:

## 1. Export your working directory as workspaceFolder

``` bash
export workspaceFolder=/Users/Brenna/Repositories/Prompt
```

## 2. Add server properties (lite-server and npm run lite)

``` json
{ 
   "name": "", 
   "version": "1.0.0", 
   "description": "", 
   "scripts": { 
     "lite": "lite-server --port 10001", 
     "start": "npm run lite" 
   }, 
   "author": "Brenna Clark", 
   "license": "ISC", 
   "devDependencies": { 
     "lite-server": "^1.3.1" 
   } 
}
```

## 3. Run npm

``` bash
npm start
```
