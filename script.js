// #Cifrando.
function encrypt(){
    values_encrypted = [];
    if ( document.getElementById('entrada').value == '' ){
        setTimeout(function(){
            document.getElementById('output').innerText = "";
        }, 3000);
        document.getElementById('output').innerHTML = "Campo <strong>entrada</strong> está vazio para cifrar.";
    } else {
        document.getElementById('output').innerText = "";
    // var data = document.getElementById('entrada').value;
    var dirty_data = document.getElementById('entrada').value;
    var remove_backslashes = dirty_data.replace("/", "");
    var remove_quote = remove_backslashes.replace(/"/g, "");
    var clean_data = remove_quote.split("\n");
    var key = CryptoJS.enc.Base64.parse(document.getElementById('key').value);
    var iv = CryptoJS.enc.Hex.parse(document.getElementById('iv').value);
    for (x in clean_data) {
        var enc = CryptoJS.AES.encrypt(clean_data[x], key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
        );
        data_enc = document.getElementById('saida').value = enc;
        values_encrypted.push(data_enc + '\n')
    }
    var clean_values = values_encrypted.toString().replace(/,/g,"")
    document.getElementById('saida').value = clean_values
    }

};

// # Decifrando.
function decrypt() {
    values_decrypted = [];
    if (document.getElementById('entrada').value == '') {
        setTimeout(function(){
            document.getElementById('output').innerText = "";
        }, 3000);
        document.getElementById('output').innerHTML = "Campo <strong>entrada</strong> está vazio para decifrar.";
    } else {
        document.getElementById('output').innerText = "";
        var dirty_data = document.getElementById('entrada').value;
        var remove_backslashes = dirty_data.replace("/", "");
        var remove_quote = remove_backslashes.replace(/"/g, "");
        var clean_data = remove_quote.split("\n");
        var key = CryptoJS.enc.Base64.parse(document.getElementById('key').value);
        var iv = CryptoJS.enc.Hex.parse(document.getElementById('iv').value);
        for (x in clean_data) {
            var dec = CryptoJS.AES.decrypt(clean_data[x], key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
            );
            var data_dec = dec.toString(CryptoJS.enc.Utf8);
            values_decrypted.push(data_dec+'\n');
            console.log("Decifrado => " + data_dec);
        }
        var clean_values = values_decrypted.toString().replace(/,/g,"")
        document.getElementById('saida').value = clean_values
    }
};
