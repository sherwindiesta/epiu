TO START ANGULAR:
forever start node_modules/@angular/cli/bin/ng serve


TO START NODE EXPRESS
npm run forever start index.js

TO STOP NODE EXPRESS
npm run forever stopall


BUILD ANGULAR FOR PRODUCTION

ng build --prod --aot --base-href ""

Note: Dont forget to change ipPort = '10.0.4.7:3000';