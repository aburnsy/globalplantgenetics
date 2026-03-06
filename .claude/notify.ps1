param([string]$Message = "Needs your attention")
Add-Type -AssemblyName System.Windows.Forms
$icon = New-Object System.Windows.Forms.NotifyIcon
$icon.Icon = [System.Drawing.SystemIcons]::Information
$icon.BalloonTipTitle = "Claude Code"
$icon.BalloonTipText = $Message
$icon.Visible = $true
$icon.ShowBalloonTip(3000)
Start-Sleep -Seconds 4
$icon.Dispose()
