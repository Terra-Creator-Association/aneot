@echo off
title AnEot update loader
setlocal enabledelayedexpansion

echo Updating Dependencies...
git pull --recurse-submodules
git submodule update --init --recursive

if exist "%~dp0program\AnEoTTool1\binary\net8.0-windows-x64\AnEoT.Tools.WordToMarkdown.exe"(
    set markdown = "%~dp0program\AnEoTTool1\binary\net8.0-windows-x64\AnEoT.Tools.WordToMarkdown.exe"
) else (
    echo [Error] AnEoT.Tools.WordToMarkdown.exe not found
    exit /b 1
)

if exist "%~dp0program\ffmpeg.exe" (
    set ffmpeg = "%~dp0program\ffmpeg.exe"
) else (
    echo [Error] ffmpeg.exe not found
    exit /b 1
)

echo Dependencies:
call "%markdown%" --version

echo Preparing paths and variables...
set Year=%date:~0,4%
set Month=%date:~5,2%
set Day=%date:~8,2%
set NewVersionCode=%Year%-%Month%
set UpdateTime=%Year%-%Month%-%Day%
set Configts="%~dp0docs\.vuepress\config.ts"
set "volFile=%~dp0docs\readme.md"
:: 读取文件并查找包含"Vol."的行
for /f "tokens=2 delims=." %%a in ('findstr /R "Vol\.[0-9]*" "%volFile%"') do (
    set "vol=%%a"
    :: 仅保留数字部分
    for /f "tokens=1" %%i in ("!vol!") do set "vol=%%i"
)
echo Current Vol: %vol%

mkdir "%~dp0docs\posts\%NewVersionCode%"
mkdir "%~dp0docs\posts\%NewVersionCode%\res"
mkdir "%~dp0docs\posts\%NewVersionCode%\res\comic"
mkdir "%~dp0docs\posts\%NewVersionCode%\res\illustration"
mkdir "%~dp0docs\posts\%NewVersionCode%\res\ope_sec"


