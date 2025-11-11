# Test script for LMS API

# Login and get token
$loginUrl = "http://localhost:5000/auth/login"
$loginBody = @{
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

try {
    # Login
    $loginResponse = Invoke-RestMethod -Uri $loginUrl -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.token
    Write-Host "Successfully logged in. Token: $($token.Substring(0, 20))..."

    # Test /auth/me endpoint
    $headers = @{
        "Authorization" = "Bearer $token"
    }

    $meResponse = Invoke-RestMethod -Uri "http://localhost:5000/auth/me" -Method Get -Headers $headers
    Write-Host "`nUser Info:"
    $meResponse | ConvertTo-Json -Depth 5

    # Test /api/courses endpoint
    Write-Host "`nFetching courses..."
    $coursesResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/courses" -Method Get -Headers $headers
    $coursesResponse | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error: $_"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody"
    }
}
