document.getElementById('searchButton').addEventListener('click', () => {
    const cep = document.getElementById('cepInput').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('result').innerText = 'CEP não encontrado.';
            } else {
                document.getElementById('result').innerHTML = `
                    <strong>Endereço:</strong> ${data.logradouro}<br>
                    <strong>Bairro:</strong> ${data.bairro}<br>
                    <strong>Cidade:</strong> ${data.localidade}<br>
                    <strong>Estado:</strong> ${data.uf}
                `;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('result').innerText = 'Ocorreu um erro ao buscar o CEP.';
        });
});
