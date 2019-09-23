<?php
$emails = array("test@gmail.com", "test.second@gmail.com", "test.third@gmail.com");
$data = $_POST;
$found_email = array_search($data["email"], $emails);

if ($found_email === 0) {
  header('Content-Type: application/json');
  echo json_encode(['message' => "success"]);
} else {
  header('Content-Type: application/json');
  echo json_encode(['message' => "error"]);
}

?>
