<?php
    $number = intval($temp_lucky);
    $number_s = strval($temp_lucky);
    $num1 = $number < 100 ? 0 : $number_s[0];
    $num2 = $number < 10 ? 0 : ($number < 100 ? $number_s[0] : $number_s[1]);
    $num3 = $number < 10 ? $number : ($number < 100 ? $number_s[1] : $number_s[2]);
    $date = "";
    $day = "";
    if($temp_class == "PPA45" || $temp_class == "PPTI6"){
        $day = "Kamis";
        $date = "20 September 2018";
    }
    else if($temp_class == "PPA43" || $temp_class == "PPA46" || $temp_class == "PPTI5"){
        $day = "Selasa";
        $date = "25 September 2018";
    }
    else{
        $day = "Senin";
        $date = "1 Oktober 2018";
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registration Confirmation</title>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro|Ultra');

        body {
            margin: 32px;
        }

        p,
        td {
            font-size: 1em;
            font-family: 'Source Sans Pro', sans-serif !important;
            color: #fff !important;
        }

        #container {
            border-radius: 16px;
            padding: 32px;
            background-color: #222f3e !important;
            color: #fff !important;
        }

        #luckynumber-container {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            text-align: center;
            font-family: 'Ultra', serif !important;
        }

        #luckynumber-container>.number {
            background-color: #fff !important;
            color: #eb4d4b !important;
            font-size: 2.5em;
            width: 2em;
            margin: 0 2px;
            padding: 24px 0;
        }
    </style>
</head>

<body>
    <div id="container">
        <p>Hai,
            <b>
                <?php echo $temp_name ?>!</b>
        </p>
        <p>Pendaftaranmu telah kami terima dan kami ucapkan terima kasih karena telah mendaftar. Kami tunggu
            kehadiranmu di
            Armour's Sleepover Party yang akan dilaksanakan pada:</p>
        <table>
            <tr>
                <td valign="top">Hari</td>
                <td  valign="top">:</td>
                <td  valign="top">
                    <?php echo $day; ?>
                </td>
            </tr>
            <tr>
                <td  valign="top">Tanggal</td>
                <td  valign="top">:</td>
                <td  valign="top">
                    <?php echo $date; ?>
                </td>
            </tr>
            <tr>
                <td  valign="top">Jam</td>
                <td  valign="top">:</td>
                <td  valign="top">17.30 WIB</td>
            </tr>
            <tr>
                <td  valign="top">Tempat</td>
                <td  valign="top">:</td>
                <td  valign="top">Discussion Room Lantai 10, BCA Learning Institute</td>
            </tr>
            <tr>
                <td  valign="top">Dresscode</td>
                <td  valign="top">:</td>
                <td  valign="top">Baju santai ala rumahan atau seragam pada hari tersebut</td>
            </tr>
        </table>
        <p>Jika kamu lupa, angka pilihanmu adalah: </p>
        <div id="luckynumber-container">
            <div class="number">
                <?php echo $num1; ?>
            </div>
            <div class="number">
                <?php echo $num2; ?>
            </div>
            <div class="number">
                <?php echo $num3; ?>
            </div>
        </div>
        <p>Simpan email ini baik-baik karena kamu harus menunjukkan email ini saat pengambilan hadiah pada hari yang
            telah
            ditentukan!</p>
        <p>Salam hangat,</p>
        <p><b>Artistic and Marvelous Four<b></p>
    </div>
</body>

</html>