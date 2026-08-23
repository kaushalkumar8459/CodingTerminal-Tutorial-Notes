$ErrorActionPreference = 'Stop'

$base = "tutorial-platform/public/tutorials/react"
$files = Get-ChildItem $base -File |
Where-Object { $_.Name -match '^day-(0[0-4][0-9]|050)-.*\.md$' } |
Where-Object {
  $first = Get-Content $_.FullName -TotalCount 1
  $first -eq '---'
} |
Sort-Object Name
$rows = foreach ($f in $files) {
  $content = Get-Content $f.FullName
  $top30 = $content | Select-Object -First 30

  $frontmatterDelims = ($top30 | Where-Object { $_ -eq '---' }).Count
  $frontmatterOk = $frontmatterDelims -eq 2

  $requiredKeys = @('title:', 'slug:', 'dayLabel:', 'level:', 'estimatedMinutes:', 'order:', 'track:')
  $missingKeys = @()
  foreach ($k in $requiredKeys) {
    if (-not ($top30 -match [regex]::Escape($k))) {
      $missingKeys += $k.TrimEnd(':')
    }
  }

  $badFence = Select-String -Path $f.FullName -Pattern '^`[a-zA-Z0-9]+$'
  $tripleFenceCount = (Select-String -Path $f.FullName -Pattern '^```' -AllMatches).Count
  $fenceBalanced = ($tripleFenceCount % 2) -eq 0
  $codeBlockCount = [int]($tripleFenceCount / 2)

  $placeholderHits = Select-String -Path $f.FullName -Pattern '(?i)\bTBD\b|Coming soon|lorem ipsum'

  $hasIndex = [bool](Select-String -Path $f.FullName -Pattern '^##\s+Index\s*$' -CaseSensitive:$false)
  $hasGoal = [bool](Select-String -Path $f.FullName -Pattern '^##\s+Goal\s*$' -CaseSensitive:$false)
  $hasPrereq = [bool](Select-String -Path $f.FullName -Pattern '^##\s+Prerequisites\s*$' -CaseSensitive:$false)
  $hasOutcome = [bool](Select-String -Path $f.FullName -Pattern '^##\s+Day\s+[0-9]+\s+Outcome\s*$|^##\s+Outcome\s*$' -CaseSensitive:$false)
  $hasExercises = [bool](Select-String -Path $f.FullName -Pattern '^##\s+.*(Exercise|Exercises|Hands-on|Task|Lab)' -CaseSensitive:$false)
  $hasAssessment = [bool](Select-String -Path $f.FullName -Pattern '^##\s+.*(Assessment|Quiz)' -CaseSensitive:$false)
  $hasCommonMistakes = [bool](Select-String -Path $f.FullName -Pattern '^##\s+Common Mistakes\s*$' -CaseSensitive:$false)
  $hasInterview = [bool](Select-String -Path $f.FullName -Pattern '^##\s+.*Interview Questions' -CaseSensitive:$false)

  $richnessScore = 0
  if ($content.Count -ge 600) { $richnessScore += 1 }
  if ($content.Count -ge 800) { $richnessScore += 1 }
  if ($codeBlockCount -ge 15) { $richnessScore += 1 }
  if ($hasExercises) { $richnessScore += 1 }
  if ($hasAssessment) { $richnessScore += 1 }

  $priorityScore = 0
  if (-not $frontmatterOk) { $priorityScore += 6 }
  if ($missingKeys.Count -gt 0) { $priorityScore += 5 }
  if ($badFence) { $priorityScore += 5 }
  if (-not $fenceBalanced) { $priorityScore += 5 }
  if ($placeholderHits) { $priorityScore += 3 }
  if (-not $hasIndex) { $priorityScore += 1 }
  if (-not $hasGoal) { $priorityScore += 3 }
  if (-not $hasPrereq) { $priorityScore += 2 }
  if (-not $hasOutcome) { $priorityScore += 2 }
  if ($richnessScore -le 2) { $priorityScore += 2 }
  if ($content.Count -lt 450) { $priorityScore += 1 }

  $priorityLevel = if ($priorityScore -ge 8) {
    'High'
  } elseif ($priorityScore -ge 4) {
    'Medium'
  } elseif ($priorityScore -gt 0) {
    'Low'
  } else {
    'None'
  }

  [pscustomobject]@{
    File = $f.Name
    Lines = $content.Count
    CodeBlocks = $codeBlockCount
    FrontmatterOk = $frontmatterOk
    MissingKeys = if ($missingKeys.Count) { $missingKeys -join ', ' } else { '' }
    BadFenceLines = if ($badFence) { ($badFence | ForEach-Object { $_.LineNumber }) -join ', ' } else { '' }
    FencesBalanced = $fenceBalanced
    PlaceholderCount = if ($placeholderHits) { $placeholderHits.Count } else { 0 }
    HasIndex = $hasIndex
    HasGoal = $hasGoal
    HasPrerequisites = $hasPrereq
    HasOutcome = $hasOutcome
    HasExercises = $hasExercises
    HasAssessment = $hasAssessment
    HasCommonMistakes = $hasCommonMistakes
    HasInterview = $hasInterview
    RichnessScore = $richnessScore
    PriorityScore = $priorityScore
    PriorityLevel = $priorityLevel
  }
}

$issues = $rows | Where-Object {
  -not $_.FrontmatterOk -or
  $_.MissingKeys -ne '' -or
  $_.BadFenceLines -ne '' -or
  -not $_.FencesBalanced -or
  $_.PlaceholderCount -gt 0 -or
  -not $_.HasIndex -or
  -not $_.HasGoal -or
  -not $_.HasPrerequisites -or
  -not $_.HasOutcome
}

$reportPath = "tutorial-platform/public/tutorials/react/day-001-to-050-quality-audit-report.md"

$md = @()
$md += '# React Day 1-50 Quality Audit Report'
$md += ''
$md += 'Generated: ' + (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
$md += ''
$md += '## Scope'
$md += ''
$md += '- Files audited: ' + $rows.Count
$md += '- Pattern: day-001 to day-050'
$md += ''
$md += '## Summary'
$md += ''
$md += '- Files with issues: ' + $issues.Count
$md += '- Files without issues: ' + ($rows.Count - $issues.Count)
$md += ''

$highPriority = @($rows | Where-Object { $_.PriorityLevel -eq 'High' }).Count
$mediumPriority = @($rows | Where-Object { $_.PriorityLevel -eq 'Medium' }).Count
$lowPriority = @($rows | Where-Object { $_.PriorityLevel -eq 'Low' }).Count

$md += '## Priority Overview'
$md += ''
$md += '- High priority files: ' + $highPriority
$md += '- Medium priority files: ' + $mediumPriority
$md += '- Low priority files: ' + $lowPriority
$md += ''

$ranked = $rows | Sort-Object -Property @{Expression='PriorityScore';Descending=$true}, @{Expression='RichnessScore';Descending=$false}, @{Expression='Lines';Descending=$false}
$topRanked = $ranked | Select-Object -First 15

$md += '## Priority Ranking (Top 15)'
$md += ''
$md += '| File | Priority | Priority Score | Richness Score | Lines | Code Blocks | Index | Outcome |'
$md += '|---|---|---:|---:|---:|---:|---|---|'
foreach ($r in $topRanked) {
  $md += ('| {0} | {1} | {2} | {3} | {4} | {5} | {6} | {7} |' -f $r.File, $r.PriorityLevel, $r.PriorityScore, $r.RichnessScore, $r.Lines, $r.CodeBlocks, $(if ($r.HasIndex) { 'OK' } else { 'MISS' }), $(if ($r.HasOutcome) { 'OK' } else { 'MISS' }))
}
$md += ''

if ($issues.Count -eq 0) {
  $md += 'All files passed the automated checklist checks.'
} else {
  $md += '## Issue Details'
  $md += ''
  foreach ($r in $issues) {
    $problems = @()
    if (-not $r.FrontmatterOk) { $problems += 'frontmatter delimiter issue' }
    if ($r.MissingKeys) { $problems += 'missing frontmatter keys: ' + $r.MissingKeys }
    if ($r.BadFenceLines) { $problems += 'malformed code fence marker lines: ' + $r.BadFenceLines }
    if (-not $r.FencesBalanced) { $problems += 'unbalanced triple backtick fences' }
    if ([int]$r.PlaceholderCount -gt 0) { $problems += 'placeholder phrases found: ' + $r.PlaceholderCount }
    if (-not $r.HasIndex) { $problems += 'missing Index section' }
    if (-not $r.HasGoal) { $problems += 'missing Goal section' }
    if (-not $r.HasPrerequisites) { $problems += 'missing Prerequisites section' }
    if (-not $r.HasOutcome) { $problems += 'missing Outcome section' }

    $md += '### ' + $r.File
    $md += ''
    foreach ($p in $problems) { $md += '- ' + $p }
    $md += ''
  }
}

$md += '## Full Matrix'
$md += ''
$md += '| File | Lines | Code Blocks | Frontmatter | Fences Balanced | Index | Goal | Prerequisites | Outcome | Placeholders | Richness | Priority |'
$md += '|---|---:|---:|---|---|---|---|---|---|---:|---:|---:|'
foreach ($r in $rows) {
  $md += ('| {0} | {1} | {2} | {3} | {4} | {5} | {6} | {7} | {8} | {9} | {10} | {11} |' -f $r.File, $r.Lines, $r.CodeBlocks, $(if ($r.FrontmatterOk) { 'OK' } else { 'FAIL' }), $(if ($r.FencesBalanced) { 'OK' } else { 'FAIL' }), $(if ($r.HasIndex) { 'OK' } else { 'MISS' }), $(if ($r.HasGoal) { 'OK' } else { 'MISS' }), $(if ($r.HasPrerequisites) { 'OK' } else { 'MISS' }), $(if ($r.HasOutcome) { 'OK' } else { 'MISS' }), $r.PlaceholderCount, $r.RichnessScore, $r.PriorityScore)
}

$md | Set-Content -Path $reportPath -Encoding UTF8
Write-Output "Created $reportPath"
Write-Output "Issues=$($issues.Count)"
