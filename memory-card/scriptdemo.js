$(document).ready(function() {
              
    //   var cards = ['dunya', 'ay', 'gunes', 'neptun', 'jupiter'];
      var pairs = cards.concat(cards);   //kart ciftleri olustur
      var secilenKartlar = [];
      var acilanKartlar = [];
      
      var oyunBaslat = false;
      var running = false;
      var outOfTime = false;
      var sayacBaslat = false;
      var win = false;
      var eslesmeSayisi = 0;
      var oyunBitir=false;
    //   var sure = 30;
      var puan=0;

      const modal_container= document.getElementById("exampleModal");
      
      shuffleArray(pairs);   //kart dizisini rastgele karistir

    $('.back').each(function(i, element) {
        $(this).attr('id', pairs[i]);    //kartlara id atamasi yapilir
    });

    $('.flip-container').click(function(){
          
        if (!outOfTime) {
        
           //oyun başlamadıysa tüm kartları kullanıcıya göster ve geri çevir
            if (!oyunBaslat && !running){
                
                running = true;
                
                $('.flip-container').each(function() {
                    $(this).toggleClass('flip');
                });
                
                setTimeout(function() {
                    
                    $('.flip-container').each(function() {
                        $(this).toggleClass('flip');
                    });
                    
                    oyunBaslat = true;
                    running = false;
                    
                }, 2000);
            }
                         
            //secilen kart zaten acilmis bir kart ise
            else if ($(this).hasClass('flip')) {                        
                return;                
            }
        
            //hic kart secilmediyse
            else if (secilenKartlar[0] == null && secilenKartlar[1] == null && !$(this).hasClass('flip') && !running) { 
                
                if (!sayacBaslat) {
                    countdown();
                }
                
                running = true;
                
                secilenKartlar[0] = $(this).find('.back').attr('id');    //secilen kart id'si secilenKartlar[0]'a atanir
                $(this).toggleClass('flip');
                
                running = false;
                
            }
        
            //ilk kart secilmis ikinci secilmediyse
            else if (secilenKartlar[0] != null && secilenKartlar[1] == null && !$(this).hasClass('flip') && !running) { 
                
                running = true;
                
                secilenKartlar[1] = $(this).find('.back').attr('id');    //secilen kart id'si secilenKartlar[1]'e atanir
                $(this).toggleClass('flip');
        
                if (secilenKartlar[0] == secilenKartlar[1]) {   //eger secilen iki kart id'si esitse
                    
                    dogru.play();
                    changeTrue();
                    secilenKartlar[0] = null;
                    secilenKartlar[1] = null;
                    
                    eslesmeSayisi++; 
                    
                    if (eslesmeSayisi == cards.length) {
                        puan=eslesmeSayisi*100;
                        dogru.pause();
                        basari.play();
                        win = true;
                        oyunBitir=true;
                        // setTimeout(function(){ alert("kazandiniz :D"); }, 1000);
                        // setTimeout(function(){ alert("puan:"+puan); }, 1000);
                        // alert("kazandiniz :D");
                    }
                    
                    running = false;
                    
                }
                        
                else {    //eger secilen iki kart id'si esit degilse
                    yanlis.play();
                    changeFalse()
                    acilanKartlar[0] = secilenKartlar[0];
                    acilanKartlar[1] = secilenKartlar[1];
                    
                    secilenKartlar[0] = null;
                    secilenKartlar[1] = null;
                    
                    setTimeout(function(){   //iki karti da geri cevir
        
                        $('*[id*=' + acilanKartlar[0] + ']').each(function() {
                            $(this).closest('.flip').toggleClass('flip');
                        });
                        $('*[id*=' + acilanKartlar[1] + ']').each(function() {
                            $(this).closest('.flip').toggleClass('flip');
                        });
                        
                        running = false;
                        
                    }, 800);
                    
                }
                
            }
                
        } else {            
            alert("maalesef süreniz bitti :(");
            running = false;
        };
        
    });//Flip Container Click Sonu

    function shuffleArray(array) {   //Fisher-Yates algorithm
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function countdown () {
          
        sayacBaslat = true;
            
        let timeSecond = sure;
        const timeH = document.getElementById("countdown");

        displayTime(timeSecond);

        const countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond == 0 || timeSecond < 1) { //sure bittiyse timer durdur
            endCount();
            clearInterval(countDown);
            fail.play();
            oyunBitir=true;
                
            $('#exampleModal2').modal('show'); 
             
        }
        else if (win) {  //oyuncu kazandıysa timer durdur
            endCount();        
            clearInterval(countDown);
            oyunBitir=true;
            $('#exampleModal').modal('show');   
            
        }
        }, 1000);

        function displayTime(second) {
        //   const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timeH.innerHTML = `
        ${sec < 10 ? "0" : ""}${sec}
        `;
        }

        function endCount() {
        timeH.innerHTML = "";
        }
        
    };

    function changeTrue(){
        document.getElementById("demo").innerHTML=("DOGRU ESLESTIRME!");
        setTimeout(function(){document.getElementById("demo").innerHTML=(""); }, 1000);
        // setTimeout(function(){document.getElementById("demo").style.background="#D3D3D3"; }, 1000);
        
    };
    function changeFalse(){
        document.getElementById("demo").innerHTML=("YANLIS ESLESTIRME!");
        setTimeout(function(){document.getElementById("demo").innerHTML=(""); }, 1000);
    };
   

    
   
});

