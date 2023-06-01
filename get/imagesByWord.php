<?php
$searchWord = $_GET['search'];
$searchWord = str_replace(' ', '+', $searchWord);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://www.bogotadc.travel/drpl/es/api/v1/es/searchbi/'.$searchWord,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;