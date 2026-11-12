# HOROLOGY — Asset Manifest Path Verification Tool
$manifestPath = "asset-manifest.json"
if (-not (Test-Path $manifestPath)) {
    Write-Error "asset-manifest.json does not exist."
    exit 1
}

$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$missing = @()
$empty = @()

foreach ($asset in $manifest.assets) {
    $fullPath = Resolve-Path $asset.path -ErrorAction SilentlyContinue
    if (-not $fullPath -or -not (Test-Path $fullPath)) {
        $missing += "$($asset.id): $($asset.path)"
    } else {
        $file = Get-Item $fullPath
        if ($file.Length -eq 0) {
            $empty += "$($asset.id): $($asset.path) is 0 bytes"
        }
    }
}

if ($missing.Count -eq 0 -and $empty.Count -eq 0) {
    Write-Host "SUCCESS: All $($manifest.assets.Count) assets in manifest verified on disk with non-zero file sizes."
} else {
    if ($missing.Count -gt 0) {
        Write-Host "Missing assets ($($missing.Count)):"
        $missing | ForEach-Object { Write-Host " - $_" }
    }
    if ($empty.Count -gt 0) {
        Write-Host "Empty assets ($($empty.Count)):"
        $empty | ForEach-Object { Write-Host " - $_" }
    }
    exit 1
}

