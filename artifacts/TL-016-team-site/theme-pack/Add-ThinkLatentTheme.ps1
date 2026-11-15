# Registers the ThinkLatent v10 theme in the tenant's theme gallery, then applies it to one site.
# Needs a SharePoint administrator (Add-SPOTheme connects to the admin centre).
# Without an admin, use the site-owner route instead: Settings > Site branding > Theme (see README.md).
#
# Usage:
#   .\Add-ThinkLatentTheme.ps1 -AdminUrl "https://<tenant>-admin.sharepoint.com" -SiteUrl "https://<tenant>.sharepoint.com/sites/<site>"

param(
  [Parameter(Mandatory = $true)] [string] $AdminUrl,
  [Parameter(Mandatory = $true)] [string] $SiteUrl,
  [string] $ThemeName = "ThinkLatent v10"
)

$theme = Get-Content -Raw -Path (Join-Path $PSScriptRoot "thinklatent-theme.json") | ConvertFrom-Json
$palette = @{}
$theme.palette.PSObject.Properties | ForEach-Object { $palette[$_.Name] = $_.Value }

Connect-SPOService -Url $AdminUrl
Add-SPOTheme -Identity $ThemeName -Palette $palette -IsInverted $false -Overwrite

# Applying it is a site owner's click, not a script step:
#   on $SiteUrl, Settings > Change the look > Theme > "From your organization" > $ThemeName > Save.

Write-Host "Theme '$ThemeName' registered. Apply it on $SiteUrl from Settings > Change the look > Theme."
