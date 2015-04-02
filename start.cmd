@echo off
echo Starting boot2docker VM...
set sshx86="%ProgramFiles(x86)%\Git\bin\ssh.exe"
set sshx64="%ProgramFiles%\Git\bin\ssh.exe"
set deploy_file=local-deploy.sh
set ssh_payload="%CD%\%deploy_file%"
set ssh_proxy="%CD%\sshproxy.cmd"
if exist %sshx86% (
	boot2docker up --vbox-share="%CD%=degree" -m 1024 --ssh=%sshx86%
	echo %sshx86% %%* ^< %ssh_payload% > sshproxy.cmd
	call :run_ssh %sshx86%
) else (
	boot2docker up --vbox-share="%CD%=degree" -m 1024 --ssh=%sshx64%
	echo %sshx64% %%* ^< %ssh_payload% > sshproxy.cmd
	call :run_ssh %sshx64%
)
goto :eof
:run_ssh
set ssh_dir=%~dp1
set ssh_drive=%~d1
set old_dir=%cd%
%ssh_drive%
cd %ssh_dir%
echo Running %deploy_file%...
echo Building docker image. Please, wait...
boot2docker --ssh=%ssh_proxy% ssh
boot2docker ssh
call :return_dir %old_dir%
goto :eof
:return_dir
set old_drive=%~d1
%old_drive%
cd %old_dir%
:eof