@title VuePress Local Testing Services
@rem 
@If not exist node_modules goto ins

@echo The browser will be automatically pulled up when the preview file is ready, if it is not pulled up successfully, please type in the browser address bar ^"http://localhost:8080^"
@echo Please wait for the command line to appear ^"vite vX.X.X devserver running at:^" Just wait a few seconds to refresh the page after it appears
pnpm run docs:dev --open
exit

@:ins
@echo No VuePress dependency detected, trying to install, please start this script again after installation is complete
@timeout /t 3 >nul
pnpm install
If not %errorlevel%==0 echo This service relies on the pnpm command, please make sure it is installed globally
@timeout /t 10 >nul
exit
