// Função de registro
document.getElementById("registrarBtn").addEventListener("click", function () {
    const data = document.getElementById("data").value;
    const energia = document.getElementById("energia").value;

    if (!data || !energia) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verifica se a data é futura
    const hoje = new Date().toISOString().split("T")[0];
    if (data > hoje) {
        alert("Você não pode registrar energia para uma data futura!");
        return;
    }

    // Pega registros salvos (ou cria objeto novo)
    let registros = JSON.parse(localStorage.getItem("registros")) || {};
    registros[data] = energia;

    // Salva no localStorage
    localStorage.setItem("registros", JSON.stringify(registros));

    console.log("Data:", data);
    console.log("Energia:", energia + " kWh");

    document.getElementById("mensagem").textContent = "Registro salvo com sucesso!";
    document.getElementById("resultadoConsulta").textContent = "";
    document.getElementById("data").value = "";
    document.getElementById("energia").value = "";
});

// Função de consulta
document.getElementById("consultarBtn").addEventListener("click", function () {
    const data = document.getElementById("data").value;

    if (!data) {
        document.getElementById("mensagem").textContent = "Informe a data para consultar.";
        document.getElementById("resultadoConsulta").textContent = "";
        return;
    }

    let registros = JSON.parse(localStorage.getItem("registros")) || {};

    if (registros[data]) {
        document.getElementById("resultadoConsulta").textContent =
            `Energia gerada em ${data}: ${registros[data]} kWh`;
        document.getElementById("mensagem").textContent = "";
    } else {
        document.getElementById("resultadoConsulta").textContent =
            "Nenhum dado encontrado para essa data.";
        document.getElementById("mensagem").textContent = "";
    }
});
