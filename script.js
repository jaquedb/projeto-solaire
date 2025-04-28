const apiUrl = "http://localhost:8080/api/energia";

document.getElementById("consultarBtn").addEventListener("click", function () {
    const data = document.getElementById("data").value;

    if (!data) {
        document.getElementById("mensagem").textContent = "Informe a data para consultar.";
        document.getElementById("resultadoConsulta").textContent = "";
        return;
    }

    fetch(`${apiUrl}/data?date=${data}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Nenhum dado encontrado.");
            }
            return response.json();
        })
        .then(dados => {
            if (dados.length > 0) {
                const energiaTotal = dados.reduce((acc, item) => acc + item.energiaGerada, 0);
                document.getElementById("resultadoConsulta").textContent =
                    `Energia gerada em ${data}: ${energiaTotal} kWh`;
                document.getElementById("mensagem").textContent = "";
            } else {
                document.getElementById("resultadoConsulta").textContent =
                    "Nenhum dado encontrado para essa data.";
                document.getElementById("mensagem").textContent = "";
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("resultadoConsulta").textContent =
                "Erro ao consultar dados.";
            document.getElementById("mensagem").textContent = "";
        });
});

// NOVO — Consultar todos os dados
document.getElementById("consultarTodosBtn").addEventListener("click", function () {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar registros.");
            }
            return response.json();
        })
        .then(dados => {
            if (dados.length > 0) {
                let lista = "Registros de energia:\n";
                dados.forEach(item => {
                    lista += `Data: ${item.date}, Energia: ${item.energiaGerada} kWh\n`;
                });
                document.getElementById("resultadoConsulta").textContent = lista;
                document.getElementById("mensagem").textContent = "";
            } else {
                document.getElementById("resultadoConsulta").textContent = "Nenhum dado encontrado.";
                document.getElementById("mensagem").textContent = "";
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById("resultadoConsulta").textContent = "Erro ao buscar dados.";
            document.getElementById("mensagem").textContent = "";
        });
        
});
