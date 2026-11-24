# Registers the ThinkLatent v11 theme in the tenant's theme gallery (design kit colour v5, TL-016 D-490).
# Needs a SharePoint administrator (Add-SPOTheme connects to the admin centre).
# Without an admin, use the site-owner route instead: Settings > Site branding > Theme (README.md, step 4).
#
# By default it registers the new theme format: four colour pairs (accent and background), read from
# thinklatent-theme.json. -Legacy registers the full Fluent palette instead, for a management shell
# that has no -ColorPairs parameter.
#
# Usage:
#   .\Add-ThinkLatentTheme.ps1 -AdminUrl "https://<tenant>-admin.sharepoint.com"
#   .\Add-ThinkLatentTheme.ps1 -AdminUrl "https://<tenant>-admin.sharepoint.com" -Legacy

param(
  [Parameter(Mandatory = $true)] [string] $AdminUrl,
  [string] $ThemeName = "ThinkLatent v11",
  [switch] $Legacy
)

$theme = Get-Content -Raw -Path (Join-Path $PSScriptRoot "thinklatent-theme.json") | ConvertFrom-Json
Connect-SPOService -Url $AdminUrl

if ($Legacy) {
  $palette = @{}
  $theme.palette.PSObject.Properties | ForEach-Object { $palette[$_.Name] = $_.Value }
  Add-SPOTheme -Identity $ThemeName -Palette $palette -IsInverted $false -Overwrite
} else {
  $pairs = @($theme.colorPairs.light | ForEach-Object {
    @{ "accentColor" = $_.accentColor; "backgroundColor" = $_.backgroundColor }
  })
  Add-SPOTheme -Identity $ThemeName -ColorPairs @{ light = $pairs } -Overwrite
}

# Applying it is a site owner's click, not a script step:
#   on the site, Settings > Change the look > Theme > "From your organization" > ThinkLatent v11 > Save.

Write-Host "Theme '$ThemeName' registered. Apply it from Settings > Change the look > Theme."
