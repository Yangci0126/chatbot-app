@echo off
chcp 65001 >nul
title AI角色扮演聊天机器人 - 安装启动

echo.
echo   ╔══════════════════════════════════════╗
echo   ║   🤖 AI角色扮演聊天机器人            ║
echo   ║   一键安装 + 启动                   ║
echo   ╚══════════════════════════════════════╝
echo.

:: 1. 检查 Node.js
echo [1/6] 检查 Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo   ❌ 没有找到 Node.js！
    echo.
    echo   请先安装 Node.js：
    echo   https://nodejs.org/  （下载 LTS 版本）
    echo   安装完成后重新运行本脚本。
    echo.
    pause
    exit /b 1
)
node --version
echo   ✅ Node.js 已就绪
echo.

:: 2. 安装后端依赖
echo [2/6] 安装后端依赖（express + openai）...
cd /d "%~dp0server"
if exist "node_modules\" (
    echo   已有 node_modules，跳过安装
) else (
    call npm install --prefer-offline
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo   ❌ 安装失败！尝试用镜像源重试...
        call npm install --registry=https://registry.npmmirror.com
        if %ERRORLEVEL% NEQ 0 (
            echo   ❌ 仍然失败，请检查网络连接
            pause
            exit /b 1
        )
    )
)
echo   ✅ 后端依赖完成
echo.

:: 3. 安装前端依赖
echo [3/6] 安装前端依赖（react + vite）...
cd /d "%~dp0client"
if exist "node_modules\" (
    echo   已有 node_modules，跳过安装
) else (
    call npm install --prefer-offline
    if %ERRORLEVEL% NEQ 0 (
        call npm install --registry=https://registry.npmmirror.com
        if %ERRORLEVEL% NEQ 0 (
            echo   ❌ 安装失败
            pause
            exit /b 1
        )
    )
)
echo   ✅ 前端依赖完成
echo.

:: 4. 启动后端
echo [4/6] 启动后端服务 (端口 3001)...
cd /d "%~dp0server"
start "ChatBot-后端" cmd /c "title 聊天机器人-后端 && node index.js && pause"
echo   ✅ 后端已启动
echo.

:: 5. 等待后端稳定
echo [5/6] 等待后端就绪...
timeout /t 3 /nobreak >nul

:: 6. 启动前端
echo [6/6] 启动前端服务 (端口 5173)...
cd /d "%~dp0client"
start "ChatBot-前端" cmd /c "title 聊天机器人-前端 && npx vite --host && pause"
echo   ✅ 前端已启动
echo.

echo   ╔══════════════════════════════════════╗
echo   ║  🎉 全部启动完成！                  ║
echo   ║                                    ║
echo   ║  浏览器打开：                      ║
echo   ║  👉 http://localhost:5173          ║
echo   ║                                    ║
echo   ║  使用步骤：                        ║
echo   ║  ① 点左下角 ⚙️ API设置            ║
echo   ║  ② 填入 DeepSeek API Key          ║
echo   ║  ③ 创建机器人 → 开始聊天           ║
echo   ╚══════════════════════════════════════╝
echo.
echo   按任意键关闭此窗口（不影响运行中的服务）
pause >nul
