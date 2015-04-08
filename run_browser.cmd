@echo off
set sshx86="%ProgramFiles(x86)%\Git\bin\ssh.exe"
set sshx64="%ProgramFiles%\Git\bin\ssh.exe"
if exist %sshx86% (
	call :run_browser %sshx86%
) else (
	call :run_browser %sshx64%
)
goto :eof
:run_browser
set ssh_path=%1
boot2docker.exe --ssh=%ssh_path% ip > ip.txt
set /p ip=<ip.txt
del ip.txt
start http://%ip%:8080
pause
:eof