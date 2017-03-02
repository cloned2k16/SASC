@call npm   install
IF ERRORLEVEL 1 goto ERROR

@call bower install
IF ERRORLEVEL 1 goto ERROR

echo Done.
goto EXIT

:ERROR
echo ERROR!
@pause

:EXIT
