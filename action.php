<?php 
  
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $cnp = $_POST['cnp'];
    $studii = $_POST['studii'];
    $domiciliu = $_POST['domiciliu'];
    $salariu = $_POST['salariu'];
    $pensie = $_POST['pensie'];


    $data = Array(
        "Name" => $name,
        "CNP" => $cnp,
        "Studii" => $studii,
        
    );

    if (isset($_POST['littleCheck'])) {
        $corespondenta = $_POST['corespondenta'];
        $data = array_merge($data, array("Adresa de Corespondenta" => $corespondenta));
            

    } else {
        $data = array_merge($data, array("Adresa de domiciliu" => $domiciliu));
    }

    if ($salariu == 1 || $pensie == 1) {
        $tip_venit = 'Salariu';
        $angajator = $_POST['angajator'];
        $functie = $_POST['functie'];
        $data_angajarii = $_POST['dataAngajarii'];
        $salariu_lunar = $_POST['salLunar'];

        $data = array_merge($data, array(
            "Tipul de venit" => $tip_venit,
            "Nume angajator" => $angajator,
            "Functie" => $functie,
            "Data angajarii" => $data_angajarii,
            "Salariu lunar" => $salariu_lunar
        ));


    } else if ($salariu == 2 || $pensie == 2) {
        $tip_venit = 'Pensie';
        $casa_pensie = $_POST['casaPensie'];
        $data_pensionare = $_POST['dataPensionare'];
        $pensie_lunara = $_POST['pensieLunara'];

        $data = array_merge($data, array(
            "Tipul de venit" => $tip_venit,
            "Casa de pensii" => $casa_pensie,
            "Data de pensionare" => $data_pensionare,
            "Pensie lunara" => $pensie_lunara
        ));
        
    }

    $data_array[] = $data;


    if (file_exists('data.json')) {
        $inp = file_get_contents('data.json');
        $existItems  = json_decode($inp);
        $existItems = array_merge($existItems, $data_array);
        $jsonData = json_encode($existItems, JSON_PRETTY_PRINT);
        file_put_contents('data.json', $jsonData);
    } else {
        $data_array = json_encode($data_array, JSON_PRETTY_PRINT);  
        file_put_contents('data.json', $data_array);
    };

    header('location: index.html');

}


?>



