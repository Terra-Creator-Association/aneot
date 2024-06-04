@title VuePress Local Testing Services
@rem This script is suitable for rapid deployment, support to add it to the debugging of your development environment(add parameter cmd).

@rem   ___    ___ ___  ________  _______                  ___    ___ ___  ________  _______   ________  _______   ________      
@rem  |\  \  /  /|\  \|\   ____\|\  ___ \                |\  \  /  /|\  \|\   ____\|\  ___ \ |\   __  \|\  ___ \ |\   ___  \    
@rem  \ \  \/  / | \  \ \  \___|\ \   __/|   ____________\ \  \/  / | \  \ \  \___|\ \   __/|\ \  \|\  \ \   __/|\ \  \\ \  \   
@rem   \ \    / / \ \  \ \  \  __\ \  \_|/__|\____________\ \    / / \ \  \ \  \  __\ \  \_|/_\ \   _  _\ \  \_|/_\ \  \\ \  \  
@rem    \/  /  /   \ \  \ \  \|\  \ \  \_|\ \|____________|\/  /  /   \ \  \ \  \|\  \ \  \_|\ \ \  \\  \\ \  \_|\ \ \  \\ \  \ 
@rem  __/  / /      \ \__\ \_______\ \_______\           __/  / /      \ \__\ \_______\ \_______\ \__\\ _\\ \_______\ \__\\ \__\
@rem |\___/ /        \|__|\|_______|\|_______|          |\___/ /        \|__|\|_______|\|_______|\|__|\|__|\|_______|\|__| \|__|
@rem \|___|/                                            \|___|/                                                                 
@rem github.com/wuyilingwei                 

@If "%~1"=="help" (
    @goto :showHelp
)
@If "%~1"=="-help" (
    @goto :showHelp
)
@If "%~1"=="/help" (
    @goto :showHelp
)
@If "%~1"=="--help" (
    @goto :showHelp
)
@If "%~1"=="h" (
    @goto :showHelp
)
@If "%~1"=="-h" (
    @goto :showHelp
)
@If "%~1"=="/h" (
    @goto :showHelp
)
@If "%~1"=="?" (
    @goto :showHelp
)
@If "%~1"=="-?" (
    @goto :showHelp
)
@If "%~1"=="/?" (
    @goto :showHelp
)

@IF "%~1" NEQ "cmd" (
    @rem Running by double clicking, start a new cmd.exe and rerun this script from it
    start cmd /k "cd /d "%~dp0" && "%~0" cmd "%~1""
    exit /b
) ELSE (
    If "%~2"=="delete" (
        @rem del all cache and dependencies
        @GOTO del
    ) ELSE If "%~2"=="reset" (
        @rem Clean up the cache and node_modules, and then install dependencies
        @set int=true
        @GOTO del
    ) ELSE IF NOT exist node_modules (
        @rem no exist dependencies, install 
        @IF NOT "%~2"=="" (
            @goto ins 
        )
        @echo Cannot execute the command because the required dependency does not exist.
        choice /T 5 /C yn /D y /M "Do you want to install it now?(5s)"
        IF ERRORLEVEL 2 (
            @echo Please install the dependency manually and run again
            @timeout /t 10 >nul
            exit /b
        ) ELSE (
            @GOTO ins
        )
    ) ELSE If "%~2"=="install" (
        @rem install dependencies
        @GOTO ins
    ) ELSE If "%~2"=="clean" (
        @rem No use cache, clear start
        @GOTO cle
    ) ELSE If "%~2"=="build" (
        @rem Build the project
        @GOTO bui
    ) ELSE If "%~2"=="update" (
        @rem Build the project
        @GOTO upd
    ) ELSE (
        @rem Running from command line
        @GOTO ser
    )
)

@:ser
@echo The browser will be pulled up, if it is not pulled up successfully, please type in the browser address bar ^"http://localhost:****^"
@echo Just wait a few seconds to refresh the page after it appears
pnpm run docs:dev --open
exit /b

@:cle
pnpm run docs:clean-dev
exit /b

@:del
@rem delete node_modules \docs\.vuepress\dist \docs\.vuepress\.temp \docs\.vuepress\.cache 
@echo Clean up the cache and node_modules
@echo Please wait...
@timeout /t 3 >nul
rd /s /q node_modules
rd /s /q docs\.vuepress\dist
rd /s /q docs\.vuepress\.temp
rd /s /q docs\.vuepress\.cache
@If "%int%"=="true" (
    @GOTO ins
)
exit /b

@:bui
pnpm run docs:build
exit /b

@:upd
pnpm dlx vp-update
exit /b

@:ins
@echo No VuePress dependency detected, trying to install... Please run again before successfully install
@timeout /t 3 >nul
pnpm install
@If not %errorlevel%==0 (
    @echo This service relies on the pnpm command, please make sure it is installed globally (npm i -g pnpm)
    @timeout /t 10 >nul
    exit /b
)

:showHelp
    @rem help
    @echo.
    @echo This script is suitable for rapid deployment, and perform some environmental operations, support to add it to the debugging of your development environment(add parameter cmd).
    @echo.
    @echo if you use in the cammand line, please add parameter cmd at first parameter, or it will open in default cammand line
    @echo default is dev build
    @echo Example: run.bat cmd or run cmd
    @echo.
    @echo if you don't want open a new cammand line, don't forget first parameter cmd
    @echo enable parameter install, install dependencies
    @echo Example: run.bat install or run install
    @echo enable parameter clean, use vuepress clean up the cache
    @echo Example: run.bat clean or run clean
    @echo enable parameter reset, clean up the cache and node_modules, and then install dependencies
    @echo Example: run.bat reset or run reset
    @echo These order must exist folder node_modules
    @echo enable parameter delete, del all cache and dependencies
    @echo Example: run.bat delate or run delete
    @echo enable parameter build, build the project
    @echo Example: run.bat build or run build
    @echo enable parameter update, update vuepress
    @echo Example: run.bat update or run update
    exit /b
