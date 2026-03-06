# Pyright type check on changed Python files
# Runs as a Stop hook — output shown to user, zero token cost

$changed = git diff --name-only HEAD -- '*.py' 2>$null
if (-not $changed) { exit 0 }

$output = pyright src/ --outputjson 2>$null | ConvertFrom-Json
$errors = $output.generalDiagnostics | Where-Object { $_.severity -eq 1 }

if ($errors.Count -gt 0) {
    Write-Host "`n[pyright] $($errors.Count) type error(s):" -ForegroundColor Red
    foreach ($e in $errors | Select-Object -First 10) {
        $file = $e.file -replace '.*[/\\]src[/\\]', 'src/'
        $line = $e.range.start.line
        Write-Host "  $file`:$line - $($e.message)" -ForegroundColor Yellow
    }
    if ($errors.Count -gt 10) {
        Write-Host "  ... and $($errors.Count - 10) more" -ForegroundColor Yellow
    }
}
