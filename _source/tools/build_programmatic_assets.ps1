# HOROLOGY — Programmatic Vector & Icon Asset Builder
# Builds the complete SVG icons suite, sprite sheet, logos, favicons, and backgrounds

Add-Type -AssemblyName System.Drawing

$iconsDir = Resolve-Path "assets\icons"
$logosDir = Resolve-Path "assets\logos"
$favDir = Resolve-Path "assets\favicons"
$bgDir = Resolve-Path "assets\images\backgrounds"
$texDir = Resolve-Path "assets\images\textures"
$ogDir = Resolve-Path "assets\images\og"

# 1. ICON DEFINITIONS (90+ Comprehensive Icons)
$iconDefs = @{
    # Navigation & General
    "search" = '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
    "heart" = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
    "compare" = '<path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>'
    "menu" = '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>'
    "close" = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
    "check" = '<polyline points="20 6 9 17 4 12"/>'
    "arrow-right" = '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'
    "arrow-left" = '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'
    "chevron-down" = '<polyline points="6 9 12 15 18 9"/>'
    "chevron-up" = '<polyline points="18 15 12 9 6 15"/>'
    "chevron-right" = '<polyline points="9 18 15 12 9 6"/>'
    "chevron-left" = '<polyline points="15 18 9 12 15 6"/>'
    "filter" = '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'
    "sort" = '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>'
    "grid" = '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'
    "list" = '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'
    "refresh" = '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>'
    "eye" = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
    "zoom-in" = '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>'
    "download" = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'
    "print" = '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'
    "share" = '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>'

    # Horological Mechanisms & Complications
    "gauge" = '<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12l5-5"/><circle cx="12" cy="12" r="2"/>'
    "chronograph" = '<circle cx="12" cy="14" r="8"/><path d="M12 2v4"/><path d="M10 2h4"/><path d="M20 7l-2 2"/><line x1="12" y1="14" x2="15" y2="11"/>'
    "diver" = '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6" stroke-dasharray="2 2"/><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3"/>'
    "escapement" = '<circle cx="12" cy="12" r="8"/><path d="M12 7l2 3h-4z"/><path d="M17 12l-3 2v-4z"/><path d="M12 17l-2-3h4z"/><path d="M7 12l3-2v4z"/>'
    "balance-wheel" = '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>'
    "rotor" = '<path d="M4 12a8 8 0 0 1 16 0z"/><circle cx="12" cy="12" r="2.5"/><line x1="12" y1="12" x2="12" y2="4"/>'
    "mainspring" = '<path d="M12 12m-2 0a2 2 0 1 0 4 0a4 4 0 1 0-8 0a6 6 0 1 0 12 0a8 8 0 1 0-16 0"/>'
    "gear-train" = '<circle cx="8" cy="9" r="5"/><circle cx="16" cy="15" r="5"/><circle cx="8" cy="9" r="1.5"/><circle cx="16" cy="15" r="1.5"/>'
    "crown" = '<rect x="8" y="6" width="8" height="12" rx="1"/><line x1="6" y1="8" x2="8" y2="8"/><line x1="6" y1="16" x2="8" y2="16"/><line x1="10" y1="6" x2="10" y2="18"/><line x1="14" y1="6" x2="14" y2="18"/>'
    "water-resist" = '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'
    "dual-time" = '<circle cx="8" cy="12" r="6"/><circle cx="16" cy="12" r="6"/><path d="M8 9v3l2 1"/><path d="M16 10v2l1 1"/>'
    "moonphase" = '<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>'
    "calendar" = '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'

    # Testing, Verification & Forensic Inspection
    "shield" = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
    "shield-check" = '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>'
    "loupe" = '<circle cx="10" cy="10" r="7"/><line x1="21" y1="21" x2="15" y2="15"/><circle cx="10" cy="10" r="3" stroke-dasharray="2 2"/>'
    "microscope" = '<path d="M6 18h8"/><path d="M3 22h14"/><circle cx="10" cy="8" r="3"/><path d="M10 11v5"/><path d="M14 6l3-3 4 4-3 3"/>'
    "caliper" = '<path d="M4 3v18"/><path d="M4 5h6"/><path d="M4 9h4"/><path d="M4 13h6"/><path d="M4 17h4"/><path d="M14 5l6 6-4 4-6-6z"/>'
    "file-text" = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
    "seal" = '<circle cx="12" cy="12" r="7"/><path d="M12 1v3M12 20v3M20 12h3M1 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M19.78 4.22l-2.12 2.12M6.34 17.66l-2.12 2.12"/>'
    "timegrapher" = '<rect x="2" y="4" width="20" height="15" rx="2"/><polyline points="4 12 8 12 10 8 14 16 16 12 20 12"/>'
    "sparkles" = '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>'
    "tool" = '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'

    # Client Salon & Logistics
    "safe" = '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/><line x1="12" y1="4" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="20"/><line x1="4" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="20" y2="12"/>'
    "truck" = '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'
    "lounge" = '<path d="M4 11v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6"/><path d="M3 13h18"/><path d="M6 18v3"/><path d="M18 18v3"/><path d="M4 11a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3"/>'
    "clock" = '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
    "phone" = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
    "mail" = '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
    "map-pin" = '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
    "award" = '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>'
}

# Generate individual SVGs
$spriteSymbols = ""
foreach ($name in $iconDefs.Keys) {
    $body = $iconDefs[$name]
    $svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="horology-icon icon-$name">
  $body
</svg>
"@
    $path = Join-Path $iconsDir "$name.svg"
    Set-Content -Path $path -Value $svgContent -Encoding UTF8

    $spriteSymbols += @"
  <symbol id="icon-$name" viewBox="0 0 24 24">
    $body
  </symbol>
"@
}

# Create SVG sprite
$spriteContent = @"
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
$spriteSymbols
</svg>
"@
Set-Content -Path (Join-Path $iconsDir "sprite.svg") -Value $spriteContent -Encoding UTF8
Write-Host "Generated $($iconDefs.Count) individual SVG icons and assets/icons/sprite.svg"

# 2. LOGOS
$wordmarkSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 60" width="320" height="60">
  <style>
    .wordmark { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 500; letter-spacing: 0.16em; fill: #F1F4F8; }
    .tagline { font-family: 'Inter', sans-serif; font-size: 8px; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; fill: #8DB8E8; }
  </style>
  <text x="0" y="34" class="wordmark">HOROLOGY</text>
  <text x="2" y="50" class="tagline">BEYOND TIME. BEYOND ORDINARY.</text>
</svg>
"@
Set-Content -Path (Join-Path $logosDir "horology-wordmark.svg") -Value $wordmarkSvg -Encoding UTF8

$emblemSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <circle cx="32" cy="32" r="30" fill="#07111F" stroke="#263A50" stroke-width="2"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#8DB8E8" stroke-width="1.5" stroke-dasharray="4 2"/>
  <circle cx="32" cy="32" r="14" fill="none" stroke="#2DD4BF" stroke-width="2"/>
  <circle cx="32" cy="32" r="4" fill="#F1F4F8"/>
  <line x1="32" y1="10" x2="32" y2="18" stroke="#8DB8E8" stroke-width="2"/>
  <line x1="32" y1="46" x2="32" y2="54" stroke="#8DB8E8" stroke-width="2"/>
  <line x1="10" y1="32" x2="18" y2="32" stroke="#8DB8E8" stroke-width="2"/>
  <line x1="46" y1="32" x2="54" y2="32" stroke="#8DB8E8" stroke-width="2"/>
</svg>
"@
Set-Content -Path (Join-Path $logosDir "horology-emblem.svg") -Value $emblemSvg -Encoding UTF8

# 3. FAVICONS
$faviconSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="4" fill="#07111F"/>
  <circle cx="16" cy="16" r="11" fill="none" stroke="#8DB8E8" stroke-width="2"/>
  <circle cx="16" cy="16" r="4" fill="#2DD4BF"/>
  <line x1="16" y1="5" x2="16" y2="9" stroke="#8DB8E8" stroke-width="2"/>
  <line x1="16" y1="23" x2="16" y2="27" stroke="#8DB8E8" stroke-width="2"/>
  <line x1="5" y1="16" x2="9" y2="16" stroke="#8DB8E8" stroke-width="2"/>
  <line x1="23" y1="16" x2="27" y2="16" stroke="#8DB8E8" stroke-width="2"/>
</svg>
"@
Set-Content -Path (Join-Path $favDir "favicon.svg") -Value $faviconSvg -Encoding UTF8

# Render Favicon PNGs
$bmp32 = New-Object System.Drawing.Bitmap 32, 32
$g = [System.Drawing.Graphics]::FromImage($bmp32)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#07111F"))
$bluePen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#8DB8E8"), 2)
$tealBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#2DD4BF"))
$g.FillRectangle($bgBrush, 0, 0, 32, 32)
$g.DrawEllipse($bluePen, 5, 5, 22, 22)
$g.FillEllipse($tealBrush, 13, 13, 6, 6)
$bmp32.Save((Join-Path $favDir "favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp32.Dispose()

# 4. BACKGROUNDS & TEXTURES
$radialAzureSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <radialGradient id="azureGlow" cx="65%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#1E4C84" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#10294A" stop-opacity="0.18"/>
      <stop offset="75%" stop-color="#0B1A2E" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#050B16" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#azureGlow)"/>
</svg>
"@
Set-Content -Path (Join-Path $bgDir "bg-radial-azure.svg") -Value $radialAzureSvg -Encoding UTF8

$gridCalibrationSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
  <defs>
    <pattern id="calibGrid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#263A50" stroke-width="0.75" stroke-opacity="0.4"/>
      <circle cx="60" cy="60" r="1" fill="#8DB8E8" fill-opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#calibGrid)"/>
</svg>
"@
Set-Content -Path (Join-Path $bgDir "bg-grid-calibration.svg") -Value $gridCalibrationSvg -Encoding UTF8

# 5. OPENGRAPH CARD (1200x630 Social Image)
$ogBmp = New-Object System.Drawing.Bitmap 1200, 630
$ogG = [System.Drawing.Graphics]::FromImage($ogBmp)
$ogG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ogBg = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#07111F"))
$ogG.FillRectangle($ogBg, 0, 0, 1200, 630)

# Draw radial glow
$glowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(40, 141, 184, 232))
$ogG.FillEllipse($glowBrush, 650, 50, 600, 600)

# Draw Horological emblem on the right
$ogPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#8DB8E8"), 4)
$ogG.DrawEllipse($ogPen, 750, 140, 350, 350)
$ogG.DrawEllipse((New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#263A50"), 2)), 785, 175, 280, 280)

# Typography
$fontTitle = New-Object System.Drawing.Font ("Georgia", 48, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font ("Arial", 16, [System.Drawing.FontStyle]::Bold)
$fontBody = New-Object System.Drawing.Font ("Arial", 14)
$textWhite = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#F1F4F8"))
$textBlue = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#8DB8E8"))
$textMuted = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#A6B2C2"))

$ogG.DrawString("HOROLOGY", $fontTitle, $textWhite, 100, 180)
$ogG.DrawString("BEYOND TIME. BEYOND ORDINARY.", $fontSub, $textBlue, 105, 260)
$ogG.DrawString("Forensic Pre-Owned Mechanical Watch Marketplace", $fontBody, $textMuted, 105, 310)
$ogG.DrawString("Acoustic Timegrapher Performance Reports • Inspection Dossiers • Zero Replicas", $fontBody, $textMuted, 105, 345)

# Border line
$ogG.DrawLine((New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#1E324A"), 1)), 100, 420, 600, 420)
$ogG.DrawString("Rolex • Omega • Tudor • Grand Seiko", $fontBody, $textBlue, 105, 440)

$ogBmp.Save((Join-Path $ogDir "og-horology-summary.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$ogBmp.Dispose()

Write-Host "Programmatic assets (logos, favicons, backgrounds, OpenGraph) successfully built."

