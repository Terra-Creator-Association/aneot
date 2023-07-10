@title VuePress Local Testing Services
@rem This script is suitable for rapid deployment, support to add it to the debugging of your development environment(add parameter cmd).

@If "%~1"=="cmd" (
    @rem Running from command line
    @GOTO ser
) ELSE (
    @rem Running by double clicking, start a new cmd.exe and rerun this script from it
    start cmd /k "cd /d "%~dp0" && "%~0" cmd"
    exit /b
)

@If not exist node_modules goto ins
@echo The browser will be pulled up, if it is not pulled up successfully, please type in the browser address bar ^"http://localhost:8080^"
@echo Just wait a few seconds to refresh the page after it appears
pnpm run docs:dev --open
exit

@:ins
@echo No VuePress dependency detected, trying to install... Please run again before successfully install
@timeout /t 3 >nul
pnpm install
@If not %errorlevel%==0 (
    @echo This service relies on the pnpm command, please make sure it is installed globally
    @timeout /t 10 >nul
    exit /b
)


