# Test script for course management

# Login as instructor
$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/auth/login" -Method Post -Body (@{
    username = "instructor1"
    password = "instructor123"
} | ConvertTo-Json) -ContentType "application/json"

$token = $loginResponse.token
Write-Host "Logged in as instructor. Token: $($token.Substring(0, 20))..."

# Set up headers with the token
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $token"
}

# Create a test course
$courseData = @{
    title = "Introduction to SQLite"
    description = "Learn the basics of SQLite database"
    instructor = "Instructor User"
} | ConvertTo-Json

try {
    # Create course
    Write-Host "Creating course..."
    $createResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/courses" -Method Post -Headers $headers -Body $courseData
    Write-Host "Course created successfully!"
    Write-Host ($createResponse | ConvertTo-Json -Depth 5)
    
    # List all courses
    Write-Host "`nListing all courses..."
    $courses = Invoke-RestMethod -Uri "http://localhost:5000/api/courses" -Method Get -Headers $headers
    Write-Host "Found $($courses.Count) courses:"
    $courses | ForEach-Object { 
        Write-Host "- $($_.title) (ID: $($_.id))" 
    }
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
