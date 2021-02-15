$(document).ready(function() {

    $.validator.addMethod('validationCNP',     function validCNP( p_cnp ) {
        var i=0 , year=0 , hashResult=0 , cnp=[] , hashTable=[2,7,9,1,4,6,3,5,8,2,7,9];
        if( p_cnp.length !== 13 ) { return false; }
        for( i=0 ; i<13 ; i++ ) {
            cnp[i] = parseInt( p_cnp.charAt(i) , 10 );
            if( isNaN( cnp[i] ) ) { return false; }
            if( i < 12 ) { hashResult = hashResult + ( cnp[i] * hashTable[i] ); }
        }
        hashResult = hashResult % 11;
        if( hashResult === 10 ) { hashResult = 1; }
        year = (cnp[1]*10)+cnp[2];
        switch( cnp[0] ) {
            case 1  : case 2 : { year += 1900; } break;
            case 3  : case 4 : { year += 1800; } break;
            case 5  : case 6 : { year += 2000; } break;
            case 7  : case 8 : case 9 : { year += 2000; if( year > ( parseInt( new Date().getYear() , 10 ) - 14 ) ) { year -= 100; } } break;
            default : { return false; }
        }
        if( year < 1800 || year > 2099 ) { return false; }
        return ( cnp[12] === hashResult );
    }, "CNP-ul este invalid"
 )

    $("#form").validate({
        rules: {
            salLunar: {
                number: true
            },
            pensieLunara: {
                number: true,
            },
            cnp: {
                validationCNP: true
            }
        },

        messages: {
            checkbox:"Selecteaza ca ești de acord cu Politica de GDPR",
            name:"Introdu numele tău",
            studii:"Selectează studiile tale",
            cnp: "Introdu CNP-ul",
            domiciliu: "Introdu adresa de domiciliu",
            corespondenta: "Introdu adresa de corespondență",
            salariu:"Selectează tipul de venit",
            angajator:"Introdu angajatorul",
            functie: "Introdu funcția",
            dataAngajarii: "Selectează data angajării",
            salLunar: {
                required:"Introdu salariul lunar",
                number: "Introdu un număr valid"
            },
            casaPensie: "Introdu numele Casei de pensii",
            dataPensioanare: "Selectează data pensionării",
            pensieLunara: {
            required:"Introdu pensia lunară",
            number: "Introdu un număr valid"
        },
            pensie:"Selectează tipul de venit"

        },
         submitHandler: function(form) {
            form.submit();
        }
    });

    $("#checkbox").click(() => {
        $("#checkbox-error").remove()
    })

    $("#checkbox-little").click(() => {
        if ($("#checkbox-little").is(":checked")) {
            $("#corespondenta").css("display", "block")
            $("#domiciliu").prop('required', false)
            $("#corespondenta").prop('required', true)
            $("label.error").remove()
            $("#domiciliu").removeClass("error")
        } else {
            $("#corespondenta").css("display", "none")
            $("#domiciliu").prop('required', true)
            $("#corespondenta").prop('required', false)
        }
    })

    $("#salariu").change(() => {
        $("#pensie").prop('required', false)
        $("#pensie label.error").remove()
        if($("#salariu option:selected").val() == 1) {
            $(".salariu-data").prop('required', true)
            $(".pensie-data").prop('required', false)
            $("label.error").remove()
            $(".right-side-pensie select").removeClass("error")
            $("#pensie option[value=1]").attr('selected', 'selected')
            $("#pensie option[value=2]").removeAttr('selected', 'selected')
        } else if($("#salariu option:selected").val() == 2) {
            $("label.error").remove()
            $(".right-side-pensie select").removeClass("error")
            $(".salariu-data").prop('required', false)
            $(".pensie-data").prop('required', true)

            $("#pensie option[value=2]").attr('selected', 'selected')
            $("#pensie option[value=1]").removeAttr('selected', 'selected')
        }
    })

    $("#pensie").change(() => {
        $("#salariu").prop('required', false)
        $("#salariu label.error").remove()
        if($("#pensie option:selected").val() == 1) {
            $(".salariu-data").prop('required', true)
            $(".pensie-data").prop('required', false)
            $("label.error").remove()
            $(".left-side-salariu select").removeClass("error")
            $("#salariu option[value=1]").attr('selected', 'selected')
            $("#salariu option[value=2]").removeAttr('selected', 'selected')
        } else if($("#pensie option:selected").val() == 2) {
            $("label.error").remove()
            $(".left-side-salariu select").removeClass("error")
            $(".salariu-data").prop('required', false)
            $(".pensie-data").prop('required', true)
            $("#salariu option[value=2]").attr('selected', 'selected')
            $("#salariu option[value=1]").removeAttr('selected', 'selected')
            
        }
    })

    

});

