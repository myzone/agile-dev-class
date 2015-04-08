@echo off
echo Initializing boot2docker...
set sshx86="%ProgramFiles(x86)%\Git\bin\ssh.exe"
set sshx64="%ProgramFiles%\Git\bin\ssh.exe"
set ssh_keyx86="%ProgramFiles(x86)%\Git\bin\ssh-keygen.exe"
set ssh_keyx64="%ProgramFiles%\Git\bin\ssh-keygen.exe"
if exist %sshx86% (
	call :run_init %sshx86% %ssh_keyx86% 
) else (
	call :run_init %sshx64% %ssh_keyx64%
)
goto :eof
:run_init
boot2docker --ssh=%1 --ssh-keygen=%2 init
echo Done. Run start.cmd to deploy project
:eof