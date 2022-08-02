@echo off
set location="F:\SoftwareWorks\DJango\sotom"

xcopy /y build\index.html %location%\frontend\templates
xcopy /y build\static\css %location%\static\css
xcopy /y build\static\js %location%\static\js
xcopy /y build\static\media %location%\static\media
xcopy /y build\manifest.json %location%\static\