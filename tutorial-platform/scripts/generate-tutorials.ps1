Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location "c:\Users\kkumar37\OneDrive - Capgemini\Desktop\react\day-wise\tutorial-platform"

$files = Get-ChildItem -Path "public\tutorials" -Filter "day-*.md" -File | Sort-Object Name

$entries = foreach ($file in $files) {
  if ($file.Name -notmatch '^day-(\d{3})-(.+)\.md$') { continue }

  $dayNum = [int]$matches[1]
  $slugTopic = $matches[2]
  $slug = "day-$($matches[1])-$slugTopic"
  $dayLabel = "Day $dayNum"

  $title = ($slugTopic -replace '-', ' ').Trim()

  $estimated = 30
  if ($title -match 'mini project|capstone|simulation') { $estimated = 45 }
  elseif ($title -match 'review|architecture|readiness') { $estimated = 35 }

  [PSCustomObject]@{
    Day = $dayNum
    Slug = $slug
    DayLabel = $dayLabel
    Title = $title
    Level = 'Beginner'
    Estimated = $estimated
    FileName = $file.Name
  }
}

$lines = @()
$lines += 'import type { TutorialMeta } from "../types/tutorial";'
$lines += ''
$lines += 'export const tutorials: TutorialMeta[] = ['

foreach ($entry in ($entries | Sort-Object Day)) {
  $titleParts = $entry.Title -split ' '
  $titleCase = ($titleParts | Where-Object { $_ -ne '' } | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ' '

  $titleCase = $titleCase -replace '\bAnd\b', 'and'
  $titleCase = $titleCase -replace '\bIn\b', 'in'
  $titleCase = $titleCase -replace '\bFor\b', 'for'
  $titleCase = $titleCase -replace '\bTo\b', 'to'
  $titleCase = $titleCase -replace '\bApi\b', 'API'
  $titleCase = $titleCase -replace '\bDom\b', 'DOM'
  $titleCase = $titleCase -replace '\bSsr\b', 'SSR'
  $titleCase = $titleCase -replace '\bSsg\b', 'SSG'
  $titleCase = $titleCase -replace '\bIsr\b', 'ISR'
  $titleCase = $titleCase -replace '\bRtk\b', 'RTK'
  $titleCase = $titleCase -replace '\bE2e\b', 'E2E'
  $titleCase = $titleCase -replace '\bCicd\b', 'CICD'
  $titleCase = $titleCase -replace '\bJs\b', 'JS'
  $titleCase = $titleCase -replace '\bRhf\b', 'RHF'

  $lines += '  {'
  $lines += ('    slug: "{0}",' -f $entry.Slug)
  $lines += ('    dayLabel: "{0}",' -f $entry.DayLabel)
  $lines += ('    title: "{0}",' -f $titleCase)
  $lines += ('    level: "{0}",' -f $entry.Level)
  $lines += ('    estimatedMinutes: {0},' -f $entry.Estimated)
  $lines += ('    fileName: "{0}",' -f $entry.FileName)
  $lines += '  },'
}

$lines += '];'
$lines += ''
$lines += 'export function getTutorialBySlug(slug: string) {'
$lines += '  return tutorials.find((tutorial) => tutorial.slug === slug);'
$lines += '}'

Set-Content -Path "src\data\tutorials.ts" -Value $lines -Encoding UTF8
Write-Output "Generated tutorials.ts with $($entries.Count) entries."
