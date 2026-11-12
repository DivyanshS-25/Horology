# HOROLOGY — Master Asset Manifest Builder Tool
Add-Type -AssemblyName System.Drawing

$manifest = @{
    "name" = "HOROLOGY Visual Asset Library"
    "version" = "1.0.0"
    "phase" = "Phase 01"
    "direction" = "Midnight Navy (Direction C)"
    "generatedAt" = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    "palette" = @{
        "navy950" = "#050B16"
        "navy900" = "#07111F"
        "navy800" = "#0B1A2E"
        "navy700" = "#10294A"
        "azure500" = "#80C1F9"
        "azure400" = "#95CFF7"
        "steel300" = "#C9D3E0"
        "steel500" = "#8FA0B8"
        "ink" = "#F2F5FA"
        "inkMuted" = "#9FB0C6"
        "verifiedGreen" = "#1E9E6A"
    }
    "assets" = @()
}

function Add-AssetRecord($id, $relPath, $category, $tier, $ratio, $isReal) {
    $fullPath = Resolve-Path $relPath -ErrorAction SilentlyContinue
    if ($fullPath -and (Test-Path $fullPath)) {
        $file = Get-Item $fullPath
        $dim = "N/A"
        if ($file.Extension -in @(".png", ".jpg", ".jpeg")) {
            try {
                $bmp = [System.Drawing.Bitmap]::FromFile($file.FullName)
                $dim = "$($bmp.Width)x$($bmp.Height)"
                $bmp.Dispose()
            } catch {}
        } elseif ($file.Extension -eq ".svg") {
            $dim = "Vector SVG"
        }

        $record = @{
            "id" = $id
            "path" = $relPath.Replace("\", "/")
            "category" = $category
            "provenanceTier" = $tier
            "aspectRatio" = $ratio
            "dimensions" = $dim
            "fileSizeBytes" = $file.Length
            "representsGenuineProduct" = $isReal
            "qaStatus" = "approved"
        }
        $manifest["assets"] += $record
    }
}

# 1. Calibration & Hero Photography (Tier 2 AI Illustrative)
Add-AssetRecord "HZ-HERO-001" "assets/images/hero/hero-home-primary-16x9.jpg" "hero" "tier2_ai_illustrative" "16:9" $false
Add-AssetRecord "HZ-HERO-002" "assets/images/hero/hero-home-secondary-dial-macro-16x9.jpg" "hero" "tier2_ai_illustrative" "16:9" $false
Add-AssetRecord "HZ-HERO-003" "assets/images/hero/hero-home-mobile-4x5.jpg" "hero" "tier2_ai_illustrative" "3:4" $false

# 2. Master Copies
Add-AssetRecord "HZ-MSTR-001" "_source/masters/hero-home-primary-16x9.jpg" "masters" "tier2_ai_illustrative" "16:9" $false
Add-AssetRecord "HZ-MSTR-002" "_source/masters/hero-home-secondary-dial-macro-16x9.jpg" "masters" "tier2_ai_illustrative" "16:9" $false
Add-AssetRecord "HZ-MSTR-003" "_source/masters/hero-home-mobile-4x5.jpg" "masters" "tier2_ai_illustrative" "3:4" $false

# 3. Logos & Favicons (Tier 3 Programmatic)
Add-AssetRecord "HZ-LOGO-001" "assets/logos/horology-wordmark.svg" "logo" "tier3_programmatic" "vector" $false
Add-AssetRecord "HZ-LOGO-002" "assets/logos/horology-emblem.svg" "logo" "tier3_programmatic" "vector" $false
Add-AssetRecord "HZ-FAV-001" "assets/favicons/favicon.svg" "favicon" "tier3_programmatic" "1:1" $false
Add-AssetRecord "HZ-FAV-002" "assets/favicons/favicon-32x32.png" "favicon" "tier3_programmatic" "1:1" $false

# 4. Backgrounds & OpenGraph (Tier 3 Programmatic)
Add-AssetRecord "HZ-BG-001" "assets/images/backgrounds/bg-radial-azure.svg" "background" "tier3_programmatic" "16:9" $false
Add-AssetRecord "HZ-BG-002" "assets/images/backgrounds/bg-grid-calibration.svg" "background" "tier3_programmatic" "vector" $false
Add-AssetRecord "HZ-OG-001" "assets/images/og/og-horology-summary.png" "opengraph" "tier3_programmatic" "1.91:1" $false

# 5. Sprite Sheet & Icons (Tier 3 Programmatic)
Add-AssetRecord "HZ-SPRITE-001" "assets/icons/sprite.svg" "icons" "tier3_programmatic" "vector" $false

# Add all 50+ SVG icons
Get-ChildItem "assets/icons/*.svg" | Where-Object { $_.Name -ne "sprite.svg" } | ForEach-Object {
    $iconName = $_.BaseName
    Add-AssetRecord "HZ-ICON-$($iconName.ToUpper())" "assets/icons/$($_.Name)" "icon" "tier3_programmatic" "1:1" $false
}

$jsonOutput = $manifest | ConvertTo-Json -Depth 5
Set-Content -Path "asset-manifest.json" -Value $jsonOutput -Encoding UTF8
Write-Host "asset-manifest.json generated with $($manifest.assets.Count) cataloged assets."

