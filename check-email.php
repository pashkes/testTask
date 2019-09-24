<?php
$emails = array("test@gmail.com", "testsecond@gmail.com", "testthird@gmail.com");
$data = $_POST;
$found_email = array_search($data["email"], $emails);

if ($found_email) {
  header('Content-Type: application/json');
  echo json_encode(['message' => "success"]);
} else {
  header('Content-Type: application/json');
  echo json_encode(['message' => "error"]);
}

?>
