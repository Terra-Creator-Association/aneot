@title VuePress本地测试服务
@rem 
@If not exist node_modules goto ins

@start http://localhost:8080
@echo 已自动拉起浏览器，如未成功拉起请在浏览器地址栏输入“http://localhost:8080”
@echo 请等待出现vite vX.X.X devserver running at: 出现后等待几秒刷新页面即可
pnpm run docs:dev
exit

@:ins
@echo 未检测到VuePress依赖，正在尝试安装，请在安装完成后再次启动本脚本
@timeout /t 3 >nul
pnpm install
If not %errorlevel%==0 echo 本服务依赖于pnpm指令，请确认已全局安装
@timeout /t 10 >nul
exit
